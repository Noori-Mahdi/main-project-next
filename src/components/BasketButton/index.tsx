'use client'

import { useContext } from 'react';
import DynamicIcon from '../DynamicIcon';
import { Context } from '@/providers/MainContext';

const BasketButton = () => {
    const {setShowBasketBox} = useContext(Context)
  return (
    <DynamicIcon
      onClick={()=>{setShowBasketBox(true)}}
      iconName="faBasketShopping"
      className="w-5 h-5 text-gray-300 cursor-pointer hover:text-yellow-900 transition-colors duration-300 ease-in-out"
    />
  );
};

export default BasketButton;
