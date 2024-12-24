'use client';

import { ModalPropsType } from '@/types/type';
import { useEffect, useState } from 'react';
import DynamicIcon from '../DynamicIcon';

const Modal = ({ isOpen, onClose, children }: ModalPropsType) => {
  const [show, setShow] = useState(isOpen);

  useEffect(() => {
    setShow(isOpen);
  }, [isOpen]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg relative w-96">
        <DynamicIcon
          iconName="faXmark"
          className="absolute top-2 right-2 cursor-pointer"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
