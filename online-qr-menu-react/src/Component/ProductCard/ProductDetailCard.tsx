import React from 'react';

interface ProductCardProps {
  imgSrc: string;
  title: string;
  description: string;
  sizes: { size: string; price: number; isSelected: boolean }[];
  iceOptions: { option: string; isSelected: boolean }[];
  onSizeSelect: (size: string) => void;
  onIceSelect: (option: string) => void;
  note: string;
  onNoteChange: (note: string) => void;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
}

const ProductDetailCard: React.FC<ProductCardProps> = ({
  imgSrc,
  title,
  description,
  sizes,
  iceOptions,
  onSizeSelect,
  onIceSelect,
  note,
  onNoteChange,
  quantity,
  onQuantityChange,
  onAddToCart,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl relative overflow-hidden shadow-lg">
      <img
        src={imgSrc}
        alt={title}
        className="w-full h-56 object-cover rounded-t-3xl"
      />
      <div className="p-4">
        <h2 className="text-2xl font-semibold">{title}</h2>
        
        <p className="mt-2 text-gray-700">{description}</p>

        <div className="mt-4">
          <h3 className="text-base font-semibold">Kích thước</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {sizes.map(({ size, price, isSelected }) => (
              <label
                key={size}
                className={`flex items-center space-x-2 p-2 border rounded-full cursor-pointer ${
                  isSelected ? 'bg-orange-500 text-white' : 'bg-white text-black'
                }`}
              >
                <input
                  type="radio"
                  name="size"
                  checked={isSelected}
                  onChange={() => onSizeSelect(size)}
                  className="form-radio h-4 w-4 text-orange-500"
                />
                <span>{size}</span>
                <span>{price}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-base font-semibold">Thêm lựa chọn</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {iceOptions.map(({ option, isSelected }) => (
              <label
                key={option}
                className={`flex items-center space-x-2 p-2 border rounded-full cursor-pointer ${
                  isSelected ? 'bg-orange-500 text-white' : 'bg-white text-black'
                }`}
              >
                <input
                  type="radio"
                  name="ice"
                  checked={isSelected}
                  onChange={() => onIceSelect(option)}
                  className="form-radio h-4 w-4 text-orange-500"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Ghi chú</label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2"
            rows={2}
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-4 mt-4">
          <div className="flex items-center space-x-2">
            <button
      className="w-10 h-10 flex items-center justify-center border rounded-full"
      onClick={() => onQuantityChange(quantity - 1)}
            >
              -
            </button>
            <span className="px-4">{quantity}</span>
            <button
      className="w-10 h-10 flex items-center justify-center border rounded-full"
      onClick={() => onQuantityChange(quantity + 1)}
            >
              +
            </button>
          </div>

          <button
            className="ml-auto w-full py-2 bg-orange-500 text-white rounded-lg"
            onClick={onAddToCart}
          >
            Thêm vào giỏ hàng
          </button>
      </div>
      </div>
    </div>
  );
};

export default ProductDetailCard;
