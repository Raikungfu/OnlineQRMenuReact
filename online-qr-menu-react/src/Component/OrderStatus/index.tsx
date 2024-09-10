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
    OrderId: number,
    status: string,
    UpdateDate: Date,
    PaymentMethod: string
  ) => {
    setOrderId(OrderId);
    triggerNotification(
      `Order ID: ${OrderId}, Status: ${status} \nPayment method: ${UpdateDate}\n Time: ${PaymentMethod}`
    );
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
          className="fixed top-20 right-4 bg-orange-500 text-white p-4 rounded shadow cursor-pointer"
          onClick={handleClickNotification}
        >
          {notificationMessage}
        </div>
      )}
    </>
  );
};

export default OrderStatusComponent;
