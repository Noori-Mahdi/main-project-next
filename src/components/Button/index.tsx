import {ButtonPropsType} from '@/types/type';
import React from 'react';
import DynamicIcon from '../DynamicIcon';

const Button = ({
  label,
  onClick,
  type = 'button',
  color = 'primary',
  size = 'base',
  disabled = false,
  icon,
  className = '',
}: ButtonPropsType) => {
  const getButtonColor = () => {
    switch (color) {
      case 'primary':
        return 'bg-yellow-900 text-white hover:bg-yellow-800';
      case 'secondary':
        return 'bg-neutral-800 text-white hover:bg-neutral-700';
      case 'danger':
        return 'bg-danger text-white hover:bg-red-700';
      default:
        return 'bg-primary text-white hover:bg-cyan-400';
    }
  };

  return (
    <button
      type={type}
      onClick={(e) => {
        onClick && onClick(e);
      }}
      disabled={disabled}
      className={` ${getButtonColor()} ${className} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${icon && 'flex justify-center items-center'} disabled:opacity-50 transition-colors duration-300 ease-in-out`}
    >
      {icon ? <DynamicIcon className="text-sm " iconName={icon} /> : label}
    </button>
  );
};

export default Button;
