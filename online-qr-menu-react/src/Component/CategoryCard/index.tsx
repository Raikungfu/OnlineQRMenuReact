import React from 'react';

interface CategoryCardProps {
  imgSrc: string;
  title: string;
  width: number;
  height: number;
}
const CategoryCard: React.FC<CategoryCardProps> = ({ imgSrc, title, width, height }) => (
  <div
  className={`w-[${width}px] h-[${height}px] bg-white rounded-[20px] border border-black/50 overflow-hidden flex flex-col p-1`}
>
  <img
    className="w-full h-full object-cover rounded-[20px]"
    src={imgSrc}
    alt={title}
  />
  <div className="relative">
    <div
      className="text-black text-base font-medium bg-white bg-opacity-75 p-1 rounded-md overflow-hidden text-ellipsis whitespace-nowrap"
      title={title}
    >
      {title}
    </div>
  </div>
</div>

);
  
export default CategoryCard;
