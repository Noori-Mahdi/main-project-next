'use client';
import {InputPropsType} from '@/types/type';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useRef, useState, useEffect, HTMLInputTypeAttribute} from 'react';
import DynamicIcon from '../DynamicIcon';

const Input = ({
  type,
  Value,
  placeholder,
  disabled,
  label,
  required,
  readOnly,
  name,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  icon,
}: InputPropsType) => {
  const [value, setValue] = useState(Value ? Value : '');
  const [focus, setFocus] = useState(false);
  const [inputType, setInputType] = useState<HTMLInputTypeAttribute>(type);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    onChange && onChange(e);
    setValue(e.target.value);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    onFocus && onFocus(e);
    setFocus(true);
  };

  const handleBlur = (
    e:
      | React.FocusEvent<HTMLInputElement>
      | React.FocusEvent<HTMLTextAreaElement, Element>
  ) => {
    onBlur && onBlur(e);
    setFocus(false);
  };

  const handleLabelClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      setFocus(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setFocus(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setValue(Value ? Value : defaultValue ? defaultValue : '');
  }, [Value, defaultValue]);

  return (
    <>
      <div
        ref={containerRef}
        className={`relative ${type == 'textarea' ? 'w-full' : 'h-12 w-full'} rounded-md text-gray-300 bg-neutral-800 focus:rounded-md shadow-inner border ${error ? 'border-red-700' : 'border-gray-600'}  hover:shadow focus-within:shadow-lg focus-within:border-yellow-900 transition-all duration-300"`}
      >
        <label
          onClick={handleLabelClick}
          className={`absolute left-0 ${
            focus || value !== ''
              ? 'top-0  -translate-y-full text-xs py-1'
              : type == 'textarea'
                ? 'top-0 ml-3 mt-3'
                : 'top-1/2 ml-3 text-sm bg-transparent -translate-y-1/2'
          }  transition-all duration-300 ease-in-out font-medium capitalize tracking-widest cursor-pointer`}
          htmlFor={name}
        >
          <span>{label}</span>
          {required && <span className="ml-1 text-sm text-red-700">*</span>}
        </label>
        {icon && (
          <div
            onClick={handleLabelClick}
            className={`absolute right-0 ${focus || value !== '' ? '-translate-y-full ' : ' translate-y-1/2 '} top-0 -translate-x-1/2`}
          >
            <DynamicIcon iconName={icon} className="text-sm cursor-pointer" />
          </div>
        )}
        {type === 'password' && value != '' && (
          <div className="absolute right-0 top-0 -translate-x-1/2 translate-y-1/2">
            {inputType === 'password' ? (
              <DynamicIcon
                onClick={() => {
                  setInputType('text');
                }}
                iconName={'faEye'}
                className="text-sm cursor-pointer"
              />
            ) : (
              <DynamicIcon
                onClick={() => {
                  setInputType('password');
                }}
                iconName={'faEyeSlash'}
                className="text-sm cursor-pointer"
              />
            )}
          </div>
        )}
        {type != 'textarea' ? (
          <>
            <input
              ref={inputRef}
              className="w-full h-full outline-none border-0 rounded-md text-sm tracking-wider bg-neutral-700 px-2"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              name={name}
              type={inputType}
              disabled={disabled}
              required={required}
              readOnly={readOnly}
              autoComplete={'off'}
              value={value}
            />
          </>
        ) : (
          <>
            <textarea
              className="w-full h-full p-1 outline-none border-0 rounded-md text-sm tracking-wider bg-neutral-700 px-2"
              onChange={handleChange}
              // onFocus={handleFocus}
              onBlur={handleBlur}
              name={name}
              disabled={disabled}
              required={required}
              readOnly={readOnly}
              autoComplete={'off'}
              value={value}
              rows={12}
            />
          </>
        )}
      </div>
      {/* <div
        className={`flex h-6 items-center text-red-700 text-sm ml-3 ${
          error == null ? 'invisible' : 'visible'
        }`}
      >
        <div className="w-1 h-1 rounded-full mr-1 bg-red-700"></div>
        <div>{error}</div>
      </div> */}
    </>
  );
};

export default Input;
