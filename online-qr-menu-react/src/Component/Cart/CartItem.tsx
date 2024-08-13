import React from 'react';

interface CartItemProps {
  productName: string;
  quantity: number;
  size: string;
  price: number;
  onEdit: () => void;
  onDelete: () => void;
  onQuantityChange: (quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ productName, size, quantity, price, onEdit, onDelete, onQuantityChange }) => {
  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-md">
      <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-2">
        <div className="text-xl font-semibold text-black">{productName}</div>
        <div className="text-base font-semibold text-black">$ {price.toFixed(2)}</div>
      </div>
      <div className="flex items-center justify-between mb-2">
        <div className="text-gray-600 text-sm">{size}</div>
        <div className="text-gray-600 text-sm">Số lượng: {quantity}</div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <button
          className="text-[#f58020] text-xs font-medium"
          onClick={onEdit}
        >
          Chỉnh sửa
        </button>
        <button
          className="text-[#f58020] text-xs font-medium"
          onClick={onDelete}
        >
          Xóa
        </button>
      </div>
      <div className="flex items-center justify-end mt-4">
        <button className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center" onClick={handleDecrement}>
          <span className="text-xl font-light">-</span>
        </button>
        <span className="mx-2 text-lg font-medium">{quantity}</span>
        <button className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center" onClick={handleIncrement}>
          <span className="text-xl font-light">+</span>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
