'use client';

import {getPages} from '@/services/pages';
import {Pages} from '@/types/type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import {useEffect, useState} from 'react';

const NavBarVertical = () => {
  const [list, setList] = useState<Pages[] | []>([]);

  const getListAsync = async () => {
    try {
      const res = await getPages();
      setList(res.data.data);
      console.log(res.data);
    } catch (error) {
      console.error('Failed to fetch pages:', error);
    }
  };
  useEffect(() => {
    getListAsync();
  }, []);

  return (
    <ul>
      {list &&
        list.map((page,index) => (
          <li key={index}>
            <Link href={page.URL}>
              <span>{page.label}</span>
              <FontAwesomeIcon icon={['fab', 'github']} />            </Link>
          </li>
        ))}
    </ul>
  );
};

export default NavBarVertical;
