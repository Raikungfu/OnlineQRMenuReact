import React from "react";

interface FooterProps {
  onCheckout: () => void;
  onCancel: () => void;
  checkoutText: string;
  cancelText: string;
}

const PaymentAccept: React.FC<FooterProps> = ({
  onCheckout,
  onCancel,
  checkoutText,
  cancelText,
}) => {
  return (
    <div className="w-full bg-white shadow-lg flex items-center justify-between p-4 bottom-0 left-0">
      <button
        onClick={onCancel}
        className="w-full bg-gray-300 text-black font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-400"
      >
        {cancelText}
      </button>
      <button
        onClick={onCheckout}
        className="w-full ml-2 bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-orange-700"
      >
        {checkoutText}
      </button>
    </div>
  );
};

export default PaymentAccept;
