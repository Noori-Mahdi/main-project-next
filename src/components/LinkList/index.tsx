'use client';

import { Pages } from '@/types/type';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

interface TextListPropsType {
  list: Pages[];
  active: boolean;
}

const LinkList = ({list, active}: TextListPropsType) => {
  const pathname = usePathname();

  return (
    <ul className="flex justify-between items-center gap-5 mt-2 capitalize text-yellow-900 text-lg font-bold">
      {list &&
        list.map((page, index) =>
          page.public || active ? (
            <li
              key={index}
              className={`group relative cursor-pointer  ${pathname === page.URL ? 'text-yellow-700' : 'text-yellow-900'} hover:text-yellow-700`}
            >
              <Link href={page.URL}>{page.label}</Link>
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-yellow-700 transition-all duration-300  ${pathname === page.URL ? 'w-full' : 'w-0 group-hover:w-full'} `}
              ></span>
            </li>
          ) : null
        )}
    </ul>
  );
};

export default LinkList;
