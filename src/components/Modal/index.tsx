'use client';

import {ModalPropsType} from '@/types/type';
import {useEffect, useState} from 'react';
import DynamicIcon from '../DynamicIcon';

const Modal = ({isOpen, onClose, className, children}: ModalPropsType) => {
  const [show, setShow] = useState(isOpen);

  useEffect(() => {
    setShow(isOpen);
  }, [isOpen]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 w-full flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`${className} p-6 rounded shadow-lg relative w-96`}
      >
        <DynamicIcon
          iconName="faXmark"
          className="absolute top-2 right-2 cursor-pointer text-gray-300 hover:text-red-600"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
