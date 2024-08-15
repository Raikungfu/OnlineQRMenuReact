import React from 'react';

interface PaymentMethodProps {
  imgSrc: string;
  label: string;
  isSelected?: boolean;
  onChange: () => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ imgSrc, label, isSelected, onChange }) => {
  return (
    <label
      className={`bg-white rounded-2xl border ${
        isSelected ? 'border-[#2044c1]' : 'border-gray-200'
      } flex items-center p-4 cursor-pointer`}
    >
      <input
        type="radio"
        name="paymentMethod"
        className="hidden"
        checked={isSelected}
        onChange={onChange}
      />
      <img className="w-10 h-10 mr-4" src={imgSrc} alt={label} />
      <span className="text-black text-base font-medium font-['Inter']">{label}</span>
      {isSelected && (
        <div className="ml-auto flex items-center">
          <div className="w-5 h-5 bg-white rounded-full border-2 border-[#2044c1] flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-[#2044c1] rounded-full"></div>
          </div>
        </div>
      )}
    </label>
  );
};

export default PaymentMethod;
