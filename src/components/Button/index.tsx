import {ButtonPropsType} from '@/types/type';
import React from 'react';
import DynamicIcon from '../DynamicIcon';

const Button = ({
  label,
  onClick,
  type = 'button',
  styleType = 'primary',
  disabled = false,
  icon,
  className = '',
}: ButtonPropsType) => {
  const getButtonStyle = () => {
    switch (styleType) {
      case 'primary':
        return 'bg-yellow-900 text-white hover:bg-yellow-800';
      case 'secondary':
        return 'bg-gray-500 text-white hover:bg-gray-700';
      case 'danger':
        return 'bg-danger text-white hover:bg-red-700';
      default:
        return 'bg-primary text-white hover:bg-cyan-400';
    }
  };

  return (
    <div className="w-full h-full">
      <button
        type={type}
        onClick={(e) => {
          onClick && onClick(e);
        }}
        disabled={disabled}
        className={` px-4 text-lg font-semibold w-full py-2 rounded ${getButtonStyle()} ${className} ${disabled ? 'cursor-not-allowed':'cursor-pointer' } ${icon && 'flex justify-center items-center'} disabled:opacity-50`}
      >
        {icon ? <DynamicIcon className='text-sm' iconName={icon}/>: label}
      </button>
    </div>
  );
};

export default Button;
