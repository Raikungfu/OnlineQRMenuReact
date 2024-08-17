import { useEffect } from 'react';
import * as signalR from '@microsoft/signalr';

interface UseSignalRProps {
    onOrderStatusUpdate: (orderId: string, status: string) => void;
    onServiceCall: (orderId: string) => void;
}

const useSignalR = ({ onOrderStatusUpdate, onServiceCall }: UseSignalRProps): void => {
    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("/AppHub")
            .configureLogging(signalR.LogLevel.Information)
            .build();

        connection.on("ReceiveOrderStatus", (orderId: string, status: string) => {
            alert("Receive Order Status" + orderId + " status " + status);
            onOrderStatusUpdate(orderId, status);
        });

        connection.on("ReceiveServiceCall", (orderId: string) => {
            onServiceCall(orderId);
        });

        connection.start().catch(err => console.error("SignalR Connection Error: ", err));

        return () => {
            connection.stop();
        };
    }, [onOrderStatusUpdate, onServiceCall]);
};

export default useSignalR;
