import { ChangeEvent, useState } from "react";

interface SearchBarProps {
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange }) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-2 p-2">
      <div className="w-full bg-white rounded-[20px] shadow">
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          className="w-full h-[62px] bg-transparent border-none text-[#5d5d5d] text-2xl font-medium font-['Inter'] placeholder:text-[#5d5d5d]/80 px-6 py-2 rounded-[30px] focus:outline-none focus:border-none"
          placeholder="Tìm kiếm"
        />
      </div>
    </div>
  );
};

export default SearchBar;
