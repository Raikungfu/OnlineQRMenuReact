import React from "react";
import { SizeOption } from "../../Hook/CartSlide";

interface CartItemProps {
  productName: string;
  sizeOptions: SizeOption[];
  price: number;
  onDelete: () => void;
  onQuantityChange: (option: string, quantity: number) => void;
  removeOptionItemFromCart: (option: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  productName,
  sizeOptions,
  price,
  onDelete,
  onQuantityChange,
  removeOptionItemFromCart,
}) => {
  const handleIncrement = (option: string) => {
    const sizeOption = sizeOptions.find((o) => o.option === option);
    if (sizeOption) {
      onQuantityChange(option, sizeOption.quantity + 1);
    }
  };

  const handleDecrement = (option: string) => {
    const sizeOption = sizeOptions.find((o) => o.option === option);
    if (sizeOption && sizeOption.quantity > 1) {
      onQuantityChange(option, sizeOption.quantity - 1);
    } else if (sizeOption?.quantity === 1) {
      const confirmDel = confirm(`Xóa sản phẩm ${productName}: ${option}`);
      if (confirmDel) removeOptionItemFromCart(option);
    }
  };

  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-md">
      <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-2">
        <div className="text-xl font-semibold text-black">{productName}</div>
        <div className="text-base font-semibold text-black">
          $ {price.toFixed(2)}
        </div>
      </div>
      <div className="flex flex-col mb-2">
        {sizeOptions.map((option, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-gray-600 text-sm mb-1"
          >
            <div>
              {option.option} {option.price > 0 ? ` - ${option.price}` : ""}
            </div>
            <div className="flex items-center">
              <button
                className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center text-xl font-light"
                onClick={() => handleDecrement(option.option)}
              >
                -
              </button>
              <span className="mx-2 text-lg font-medium">
                {option.quantity}
              </span>
              <button
                className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center text-xl font-light"
                onClick={() => handleIncrement(option.option)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end mt-2">
        <button
          className="text-[#f58020] text-xs font-medium"
          onClick={onDelete}
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

export default CartItem;
