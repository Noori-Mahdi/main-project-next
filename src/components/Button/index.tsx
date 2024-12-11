import {ButtonPropsType} from '@/types/type';
import React from 'react';

const Button = ({
  label,
  onClick,
  type = 'button',
  styleType = 'primary',
  disabled = false,
  className = '',
}: ButtonPropsType) => {
  const getButtonStyle = () => {
    switch (styleType) {
      case 'primary':
        return 'bg-primary text-white hover:bg-cyan-400';
      case 'secondary':
        return 'bg-gray-500 text-white hover:bg-gray-700';
      case 'danger':
        return 'bg-danger text-white hover:bg-red-700';
      default:
        return 'bg-primary text-white hover:bg-cyan-400';
    }
  };

  return (
    <div className="w-full">
      <button
        type={type}
        onClick={(e) => {
          onClick && onClick(e);
        }}
        disabled={disabled}
        className={` px-4 text-lg font-semibold w-full py-2 rounded ${getButtonStyle()} ${className} ${disabled ? 'cursor-not-allowed':'cursor-pointer' } disabled:opacity-50`}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
