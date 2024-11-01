import { useState } from "react";
import useSignalR from "../../Hook/Hubs";
import { useNavigate } from "react-router-dom";

interface OrderStatusProps {
  shopId?: string;
  tableId?: string;
}

const OrderStatusComponent: React.FC<OrderStatusProps> = ({
  shopId,
  tableId,
}) => {
  const [notificationMessage, setNotificationMessage] = useState("");
  const [orderId, setOrderId] = useState<number>(0);
  const [showNotification, setShowNotification] = useState(false);
  const nav = useNavigate();

  const handleOrderStatusUpdate = (
    orderId: number,
    status: string,
    updateDate: Date,
    paymentMethod: string,
    orderDate: Date
  ) => {
    switch (status) {
      case "PENDING":
        setOrderId(orderId);
        triggerNotification(
          `Order is being prepared, please wait.<br/>Payment method: ${paymentMethod}<br/>ID: ${orderId}, Date: ${convertDate(
            orderDate
          )}`
        );
        break;
      case "PREPARING":
        triggerNotification(
          `Order is being prepared, please wait.<br/> Order ID: ${orderId}, Order Date: ${convertDate(
            updateDate
          )}`
        );
        break;
      case "COMPLETED":
        triggerNotification(
          `Order has been completed, enjoy your meal!.<br/> Order ID: ${orderId}, Order Date: ${convertDate(
            updateDate
          )}`
        );
        break;
      case "CANCELLED":
        triggerNotification(
          `Order has been cancelled, please contact staff for more information.<br/> Order ID: ${orderId}, Order Date: ${convertDate(
            updateDate
          )}`
        );
        break;
      default:
        break;
    }
  };

  const convertDate = (date: Date) => {
    return new Date(date).toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const triggerNotification = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  const handleServiceCall = (OrderId: number) => {
    console.log(`Received service call for Order ID: ${OrderId}`);
  };

  useSignalR({
    onOrderStatusUpdate: handleOrderStatusUpdate,
    onServiceCall: handleServiceCall,
  });

  const handleClickNotification = () => {
    if (shopId && tableId && orderId) {
      nav(`/menu/shop/${shopId}/table/${tableId}/order-detail/${orderId}`);
    }
  };

  return (
    <>
      {showNotification && (
        <div
          className="fixed top-20 right-4 bg-orange-500 text-white p-2 rounded shadow cursor-pointer"
          onClick={handleClickNotification}
        >
          {notificationMessage}
        </div>
      )}
    </>
  );
};

export default OrderStatusComponent;
