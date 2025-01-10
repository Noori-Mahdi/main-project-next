import { createPortal } from 'react-dom';
import DynamicIcon from '../DynamicIcon';
import { ToastPropsType } from '@/types/type';
import { useEffect, useState } from 'react';

const Toast = ({ message, type, onClose }: ToastPropsType) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 5000); // زمان انیمیشن
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible || !message) return null;

  return createPortal(
    <div className="fixed w-80 bg-opacity-75 left-0 top-4 transform translate-x-5 bg-neutral-800 text-neutral-500 hover:text-neutral-400 p-4 rounded z-50 flex items-center justify-between">
      <div
        className={`${
          type === 'error'
            ? 'text-red-700'
            : type === 'warning'
            ? 'text-yellow-500'
            : 'text-green-700'
        } text-sm font-medium tracking-wide`}
      >
        {message}
      </div>
      <div className="cursor-pointer">
        <DynamicIcon
          className="hover:text-red-700"
          iconName={'faXmark'}
          onClick={() => {
            setVisible(false);
            if (onClose) onClose();
          }}
        />
      </div>
      <div className="absolute bottom-0 left-0 h-1 rounded-bl-md rounded-br-md w-full bg-neutral-600 overflow-hidden">
        <div
          className={`${
            type === 'error'
              ? 'bg-red-700'
              : type === 'warning'
              ? 'bg-yellow-500'
              : 'bg-green-700'
          } absolute bottom-0 left-0 h-1 rounded-bl-md rounded-br-md animate-width-grow transition-all duration-500`}
        ></div>
      </div>
    </div>,
    document.body
  );
};

export default Toast;
