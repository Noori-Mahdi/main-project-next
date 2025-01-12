import { ConfirmationModalPropsType } from '@/types/type';
import React from 'react';
const ConfirmationModal = ({message, onConfirm, onCancel, isOpen}:ConfirmationModalPropsType) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 select-none bg-neutral-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-neutral-800 rounded-lg border-2 border-yellow-800 shadow-lg max-w-md w-full p-6">
        <p className=" text-lg mb-6 font-semibold text-gray-300">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-neutral-700 text-gray-300 rounded-md hover:bg-neutral-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-yellow-800 text-white rounded-md hover:bg-yellow-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmationModal;