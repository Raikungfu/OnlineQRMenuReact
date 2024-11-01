import React from "react";

interface CategoryCardProps {
  imgSrc: string;
  name: string;
  description?: string;
  isSelected: boolean;
  selectCategory: () => {};
}
const CategoryCard: React.FC<CategoryCardProps> = ({
  imgSrc,
  name,
  description,
  isSelected,
  selectCategory,
}) => (
  <div
    className={`w-[20%] h-[150px] rounded-[20px] border overflow-hidden flex flex-col p-1 cursor-pointer ${
      isSelected ? "bg-orange-200" : ""
    } hover:w-[30%]`}
    onClick={() => selectCategory()}
    title={`${name}\n${description}`}
  >
    <img
      className="w-full h-3/4 object-cover object-center rounded-[20px]"
      src={imgSrc}
      alt={name}
    />
    <div className="h-1/4 relative">
      <div className="text-black text-base font-medium p-1 rounded-md overflow-hidden text-ellipsis whitespace-nowrap">
        {name}
      </div>
    </div>
  </div>
);

export default CategoryCard;
