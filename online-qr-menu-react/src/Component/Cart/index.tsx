import React from 'react';

interface CartSummaryProps {
  subtotal: number;
  discount: number;
  total: number;
  onCheckout: () => void;
  onCancel: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal, discount, total, onCheckout, onCancel }) => {
  return (
    <div className="relative w-full p-4 bg-white rounded-3xl shadow-md">
      <div className="mb-4 border-b border-gray-200 pb-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-black text-sm font-semibold">Subtotal</span>
          <span className="text-gray-600 text-sm font-semibold">{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-black text-sm font-semibold">Discount</span>
          <span className="text-gray-600 text-sm font-semibold">{discount.toFixed(2)}</span>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 pt-2 mb-4">
        <span className="text-black text-lg font-semibold">Total</span>
        <span className="text-black text-lg font-semibold">{total.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={onCancel}
          className="w-full bg-gray-300 text-black font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={onCheckout}
          className="w-full ml-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
