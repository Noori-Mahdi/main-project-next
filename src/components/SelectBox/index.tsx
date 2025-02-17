'use client';
import {useEffect, useRef, useState} from 'react';
import Input from '../Input';
import {OptinTypeInSelectBox, SelectBoxPropsType} from '@/types/type';

const SelectBox = ({
  options,
  label,
  name,
  icon,
  defaultValueId,
  onChange,
}: SelectBoxPropsType) => {
  const [value, setValue] = useState<OptinTypeInSelectBox>(options[0]);
  const [showList, setShowList] = useState<boolean>(false);
  const selectBoxRef = useRef<HTMLDivElement | null>(null);

  if (options.length == 0 || !options) return null;

  useEffect(() => {
    onChange && onChange({target: {name: name, value: value.id}});
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectBoxRef.current &&
        !selectBoxRef.current.contains(event.target as Node)
      ) {
        setShowList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (defaultValueId && options)
      setValue(
        options.find((e) => {
          e.id == defaultValueId;
        }) || options[0]
      );
  }, [defaultValueId]);

  return (
    <div className="relative w-full" ref={selectBoxRef}>
      <div className="relative">
        <div
          onClick={() => {
            setShowList(!showList);
          }}
          className="absolute w-full h-full z-30 rounded-md"
        ></div>
        <Input
          label={label}
          type="text"
          readOnly
          disabled
          name={name}
          Value={options.find((options) => options.id == value.id)?.name}
          icon={icon}
        />
      </div>
      {showList && (
        <ul className="absolute z-30 bg-neutral-800 border border-yellow-700 rounded-sm w-full">
          {options.map((option: OptinTypeInSelectBox, index: number) => (
            <li
              className={`p-2 hover:bg-neutral-700 cursor-pointer ${value.id == option.id && 'bg-neutral-700 font-medium text-gray-300'}`}
              onClick={() => {
                setValue(option);
                setShowList(false);
                onChange && onChange({target: {name: name, value: option.id}});
              }}
              key={index}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectBox;
