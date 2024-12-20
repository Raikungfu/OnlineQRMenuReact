import React from "react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  imgSrc: string;
  name: string;
  description: string;
  price: number;
  productId: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imgSrc,
  name,
  description,
  price,
  productId,
}) => {
  const navigate = useNavigate();

  const handleSelect = () => {
    navigate(`product-detail/${productId}`);
  };

  return (
    <div
      className={`w-full h-[360px] bg-white rounded-[20px] shadow overflow-hidden flex flex-col justify-between`}
      title={`${name}\n${description}`}
    >
      <img className="w-full h-[70%] object-cover" src={imgSrc} alt={name} />
      <div className="p-2 h-[30%] flex flex-col justify-between">
        <div className="text-black text-base font-medium">
          {price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </div>
        <div className="text-black text-sm font-medium overflow-hidden text-ellipsis whitespace-nowrap">
          {name}
        </div>
        <button
          onClick={handleSelect}
          className="w-full h-[26px] bg-[#fe562d]/20 rounded-[20px] flex items-center justify-center mt-2 text-black text-sm font-medium"
        >
          Chọn
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
