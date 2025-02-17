'use client';

import Image from 'next/image';
import Button from '../Button';
import DynamicIcon from '../DynamicIcon';
import ImgBox from '../ImgBox';
import {ProductType} from '@/types/type';

const ItemCard = ({
  id,
  name,
  description,
  image,
  price,
  discount,
  likes,
  rating,
  views,
  sold,
  stock,
  categoryId,
  category,
  reviews,
}: ProductType) => {
  return (
    <div className="w-52 h-72 rounded-md bg-slate-600 border-2  hover:border-yellow-800">
      <div className="h-2/3 w-full bg-neutral-700 overflow-hidden  rounded-tr-md rounded-tl-md relative">
        <div className="absolute right-0 top-0 w-1/5 h-full flex flex-col justify-start ">
          <Button
            icon="faHeart"
            color="transparent"
            iconClass="text-gray-300 hover:text-yellow-700 text-sm"
            className=" m-2"
          />
          <Button
            icon="faBasketShopping"
            color="transparent"
            iconClass="text-gray-300 hover:text-yellow-700 text-sm"
            className=" m-2"
          />
        </div>
        {discount && (
          <div className="absolute z-20 flex justify-center left-0 top-0 -translate-x-1/4 translate-y-1/2 -rotate-45 w-6/12 bg-yellow-800 font-semibold text-gray-300">
            {discount}%
          </div>
        )}
        <Image
          alt={name}
          src={image}
          layout="fill"
          className="absolute"
        />
      </div>
      <div className="h-1/3 p-2 w-full flex flex-col justify-between">
        <div className=" capitalize text-sm font-semibold tracking-wide">
          {name}
        </div>
        <div className="flex justify-between gap-1 items-center">
          <div className="flex gap-1">
            <DynamicIcon
              className="text-sm text-yellow-500"
              iconName="faStar"
            />
            <div className="text-sm font-medium">{rating}/5</div>
          </div>
          <div className="text-base flex items-end gap-2 font-semibold">
            <div className="line-through text-sm text-gray-300">{price} $</div>
            {discount && (
              <div className="">{price - (price / 100) * discount} $</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
