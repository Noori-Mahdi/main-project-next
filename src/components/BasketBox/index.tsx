'use client'
import { useContext } from 'react';
import DynamicIcon from '../DynamicIcon';
import { Context } from '@/providers/MainContext';

const BasketBox = () => {
  const { showBasketBox, setShowBasketBox } = useContext(Context);

  return (
    <div
      className={`absolute right-0 top-0 h-full w-3/12 shadow-[0_4px_30px_rgba(0,0,0,0.1)] bg-neutral-800 transform  transition-transform duration-500 ${
        showBasketBox ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div>
        <div className="flex justify-between items-center px-3 py-1 text-gray-300 border-b mx-1 border-yellow-900">
          <div>
            <span className="capitalize select-none cursor-auto font-semibold text-lg">
              Basket
            </span>
            <DynamicIcon iconName="faBasketShopping" className="ml-2 text-sm" />
          </div>

          <DynamicIcon
            iconName="faAnglesRight"
            className="cursor-pointer hover:text-yellow-800"
            onClick={() => {
              setShowBasketBox(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BasketBox;
