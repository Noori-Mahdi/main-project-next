'use client';

import {useState} from 'react';
import DynamicIcon from '../DynamicIcon';
import Button from '../Button';

interface SearchBoxPropsType {
  onClick?: (text: string) => void;
}

const SearchBox = ({onClick}: SearchBoxPropsType) => {
  const [searchValue, setSearchValue] = useState<string | null>(null);

  const handleClick = () => {
    if (searchValue && searchValue == '') {
      //   onClick(searchValue);
    } else {
    }
  };

  return (
    <>
      {
        <div className="flex w-full h-full rounded-sm">
          <div className="flex justify-stretch items-stretch h-full">
            {' '}
            <input
              className="grow h-full  outline-none text-sm font-medium placeholder:text-sm placeholder:font-medium rounded-tl-sm rounded-bl-sm px-1 py-0.5"
              type="text"
              placeholder="Search ..."
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </div>

          <div className="flex justify-stretch items-stretch h-full">
            {' '}
            <Button
              color='primary'
              className="font-medium text-sm rounded-tr-sm rounded-br-sm -tracking-tighter h-full px-1 py-0.5"
              label="search"
              onClick={handleClick}
            />
          </div>
        </div>
      }
    </>
  );
};

export default SearchBox;
