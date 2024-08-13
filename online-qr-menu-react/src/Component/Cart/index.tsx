import React from 'react';

interface CartSummaryProps {
  subtotal: number;
  discount: number;
  total: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal, discount, total }) => {
  return (
    <div className="bottom-0 w-full max-w-md p-4 bg-white rounded-3xl shadow-md">
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
      <div className="flex items-center justify-between border-t border-gray-200 pt-2">
        <span className="text-black text-lg font-semibold">Total</span>
        <span className="text-black text-lg font-semibold">{total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartSummary;