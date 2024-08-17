import { useEffect } from 'react';
import * as signalR from '@microsoft/signalr';
import { API_BASE_URL } from '../Type/constant';

interface UseSignalRProps {
    onOrderStatusUpdate: (orderId: string, status: string) => void;
    onServiceCall: (orderId: string) => void;
}

const useSignalR = ({ onOrderStatusUpdate, onServiceCall }: UseSignalRProps) => {
    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`${API_BASE_URL}/AppHub/order`, {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
              })
            .configureLogging(signalR.LogLevel.Information)
            .build();

        connection.on("ReceiveOrderStatus", (orderId, status) => {
            console.log("Received Order Status: ", orderId, status);
            onOrderStatusUpdate(orderId, status);
        });

        connection.on("ReceiveServiceCall", (orderId) => {
            console.log("Received Service Call for Order ID: ", orderId);
            onServiceCall(orderId);
        });

        connection.start()
            .then(() => console.log("SignalR Connected"))
            .catch(err => console.error("SignalR Connection Error: ", err));

        return () => {
            connection.stop()
                .then(() => console.log("SignalR Disconnected"))
                .catch(err => console.error("SignalR Disconnection Error: ", err));
        };
    }, [onOrderStatusUpdate, onServiceCall]);
};

export default useSignalR;
