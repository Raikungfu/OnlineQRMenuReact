import { useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import { API_BASE_URL } from "../Type/constant";

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
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${API_BASE_URL}/AppHub/order`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
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
