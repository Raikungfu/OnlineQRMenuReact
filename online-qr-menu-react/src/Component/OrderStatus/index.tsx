import { useState } from 'react';
import useSignalR from '../../Hook/Hubs';

const OrderStatusComponent = () => {
    const [notificationMessage, setNotificationMessage] = useState('');
    const [serviceCallOrderId, setServiceCallOrderId] = useState('');
    const [showNotification, setShowNotification] = useState(false);


    const handleOrderStatusUpdate = (orderId: string, status: string) => {
        triggerNotification(`Order ID: ${orderId}, Status: ${status}`);
    };
    
    const triggerNotification = (message: string) => {
        setNotificationMessage(message);
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      };

    const handleServiceCall = (orderId: string) => {
      console.log(serviceCallOrderId);
        setServiceCallOrderId(`Received service call for Order ID: ${orderId}`);
    };

    useSignalR({
        onOrderStatusUpdate: handleOrderStatusUpdate,
        onServiceCall: handleServiceCall
    });

    return (<>
             {showNotification && (
    <div className="fixed top-20 right-4 bg-orange-500 text-white p-4 rounded shadow">
      {notificationMessage}
    </div>
  )}
    </>
        
    );
};

export default OrderStatusComponent;
