import React from 'react';

interface ProductCardProps {
  imgSrc: string;
  title: string;
  price: number;
  width: number;
  height: number;
}
const ProductCard: React.FC<ProductCardProps> = ({ imgSrc, title, price, width, height }) => (
  <div className={`w-[${width}px] h-[${height}px] bg-white rounded-[20px] shadow overflow-hidden flex flex-col`}>
    <img className="w-full h-[70%] object-cover" src={imgSrc} alt={title} />
    <div className="p-2 flex flex-col justify-between h-[30%]">
      <div className="text-black text-base font-medium">{price}</div>
      <div className="text-black text-sm font-medium">{title}</div>
      <div className="w-full h-[26px] bg-[#fe562d]/20 rounded-[20px] flex items-center justify-center mt-2">
        <span className="text-black text-sm font-medium">Chọn</span>
      </div>
    </div>
  </div>
);

export default ProductCard;
