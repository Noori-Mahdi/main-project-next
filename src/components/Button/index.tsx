import {ButtonPropsType} from '@/types/type';
import React from 'react';
import DynamicIcon from '../DynamicIcon';
import Link from 'next/link';

const Button = ({
  label,
  onClick,
  type = 'button',
  color = 'primary',
  size = 'base',
  disabled = false,
  iconClass,
  icon,
  url,
  className = '',
}: ButtonPropsType) => {
  const getButtonColor = () => {
    switch (color) {
      case 'primary':
        return 'bg-yellow-900 text-white hover:bg-yellow-800';
      case 'secondary':
        return 'bg-neutral-900 text-white hover:bg-neutral-800';
      case 'danger':
        return 'bg-red-600 text-white hover:bg-red-800';
      case 'info':
        return 'bg-blue-600 text-white hover:bg-blue-800';
      case 'transparent':
        return 'bg-transparent';
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
      className={` ${getButtonColor()} ${className} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${icon && 'flex justify-center items-center'} relative disabled:opacity-50 transition-colors duration-300 ease-in-out`}
    >
      {url && (
        <Link className="absolute w-full h-full left-0 top-0 z-0" href={url} />
      )}
      {icon ? (
        <DynamicIcon className={`text-sm z-20 ${iconClass} `} iconName={icon} />
      ) : (
        label
      )}
    </button>
  );
};

export default Button;
