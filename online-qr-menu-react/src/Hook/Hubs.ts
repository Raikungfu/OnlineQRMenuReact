import { useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import { API_BASE_URL } from "../Type/constant";

const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

var id = "";

interface UseSignalRProps {
  onOrderStatusUpdate: (
    orderId: number,
    status: string,
    updateDate: Date,
    paymentMethod: string,
    orderDate: Date
  ) => void;
  onServiceCall: (OrderId: number) => void;
}

const useSignalR = ({
  onOrderStatusUpdate,
  onServiceCall,
}: UseSignalRProps) => {
  useEffect(() => {
    let deviceId = localStorage.getItem("deviceId");
    if (!deviceId) {
      deviceId = generateUUID();
      localStorage.setItem("deviceId", deviceId);
    }

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(
        `${API_BASE_URL}/AppHub/order?deviceId=${encodeURIComponent(
          deviceId
        )}&role=${encodeURIComponent("customer")}&id=${encodeURIComponent(id)}`,
        {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets,
          accessTokenFactory: () => deviceId,
        }
      )
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connection.on("ReceiveOrderStatus", (orderProcessDto) => {
      if (!orderProcessDto) {
        console.error("Received undefined or null data from server");
        return;
      }

      const { orderId, status, updateDate, paymentMethod, orderDate } =
        orderProcessDto;

      if (orderId && status && updateDate && paymentMethod && orderDate) {
        onOrderStatusUpdate(
          orderId,
          status,
          updateDate,
          paymentMethod,
          orderDate
        );
      } else {
        console.error("Some properties are undefined: ", orderProcessDto);
      }
    });

    connection.on("ReceiveServiceCall", (OrderId) => {
      console.log("Received Service Call for Order ID: ", OrderId);
      onServiceCall(OrderId);
    });

    connection
      .start()
      .then(() => console.log("SignalR Connected"))
      .catch((err) => console.error("SignalR Connection Error: ", err));

    return () => {
      connection
        .stop()
        .then(() => console.log("SignalR Disconnected"))
        .catch((err) => console.error("SignalR Disconnection Error: ", err));
    };
  }, [onOrderStatusUpdate, onServiceCall]);
};

export default useSignalR;
