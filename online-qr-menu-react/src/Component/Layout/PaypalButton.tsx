import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalButtonProps {
    amount: number;
    onSuccess: () => void;
}

const initialOptions = {
    clientId: "AfNE9gtBEnJ0WSimWeJPqrsvhbFwcSjIVmLR3sHMMOBfqMbw5D3vhJeEJAjjlVYHKpQ9z1nZf_Jbb9BG",
    currency: "USD",
};

const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, onSuccess }) => {
    
    const handleApprove = (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
            alert(`Transaction completed by ${details.payer.name.given_name}`);
            onSuccess();
        });
    };

    const handleError = (error: any) => {
        console.log(error.message);
        alert(`An error occurred: ${error.message}`);
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
                createOrder={(data: any, actions: any) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                currency_code: "USD",
                                value: (amount / 25000).toFixed(2)
                            }
                        }]
                    });
                }}
                onApprove={handleApprove}
                onError={handleError}
            />
        </PayPalScriptProvider>
    );
};

export default PayPalButton;
