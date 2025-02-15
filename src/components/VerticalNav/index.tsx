'use client';

import Link from 'next/link';
import DynamicIcon from '../DynamicIcon';
import {LinkObj} from '@/types/type';
import {useState} from 'react';
import {usePathname} from 'next/navigation';

interface VerticalNavPropsType {
  navTitle?: string;
  linlList: LinkObj[];
}

const VerticalNav = ({navTitle, linlList}: VerticalNavPropsType) => {
  const activeLink = usePathname();

  return (
    <ul className="flex flex-col capitalize  text-base font-medium tracking-wide text-gray-400 w-2/12 h-full bg-neutral-800">
      {navTitle && (
        <li className="text-center py-2 border-b text-yellow-600 border-yellow-700">
          {navTitle}
        </li>
      )}
      {linlList.map((link, index) => (
        <li
          key={index}
          className={`w-full border-b cursor-pointer transition-colors duration-300 
                 ease-in-out hover:text-yellow-700 border-gray-300 
                 p-2 ${activeLink.includes(link.pathname) && ' text-gray-100'}`}
        >
          <Link
            className={`flex ${link.icon && link.label ? 'justify-between' : 'justify-start'}  items-center`}
            href={link.pathname}
          >
            <div>{link.label}</div>
            {link.icon && <DynamicIcon iconName={link.icon} />}
          </Link>
        </li>
      ))}
      <li></li>
    </ul>
  );
};

export default VerticalNav;
