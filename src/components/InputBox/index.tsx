'use client';

import {faEyeSlash, faEye} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Input from '../Inpurt';
import Link from 'next/link';
import {InputBoxType} from '@/types/type';
import '@/sass/global.scss';
import {useEffect, useState} from 'react';

const InputBox = ({
  type,
  label,
  name,
  defaultValuevalue,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  options,
  disabled = false,
  maxLength,
  minLength,
  min,
  max,
  rows,
  className,
  required = false,
  readonly = false,
  tooltip,
  disableCheackPasswordLvl = false,
  propError = null,
  icon,
  disableForgetPassword = false,
}: InputBoxType) => {
  const [activeMode, setActiveMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordLvl, setPasswordLvl] = useState(0);

  const handleError = (e: string | null) => {
    setError(e);
  };

  return (
    <div
      className={`flex bg-secandry border-x-4 border-y border-color-muted rounded-md  ${activeMode ? 'border-x-color-primary' : error != null && 'border-x-color-danger'}`}
    >
      <div className="flex text-lg border-r justify-center items-center rounded-bl-md rounded-tl-md px-3">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center border-b p-2 py-1 w-full">
          <div>
            <span className="font-medium capitalize tracking-normal text-sm text-primary">
              {label}
            </span>
            {required && <span className="text-danger pl-1">*</span>}
          </div>

          {error || propError ? (
            <div>
              <span className="text-xs text-danger">{error || propError}</span>
            </div>
          ) : (
            type === 'password' &&
            name !== 'confirmPassword' &&
            disableCheackPasswordLvl && (
              <div className="flex items-center h-2">
                {Array.from({length: 4}, (_, i) => (
                  <div
                    key={i}
                    className={`w-4 h-0.5 ${
                      passwordLvl >= i + 1 ? 'bg-primary' : 'bg-white'
                    } mr-1`}
                  ></div>
                ))}
              </div>
            )
          )}
        </div>
        <div className="flex">
          <div className={`w-full h-full`}>
            <Input
              name={name}
              defaultValuevalue={defaultValuevalue}
              type={type}
              disabled={disabled}
              customError={true}
              placeholder={placeholder}
              max={max}
              min={min}
              required={required}
              maxLength={maxLength}
              minLength={minLength}
              readonly={readonly}
              passwordLvl={setPasswordLvl}
              showPassword={showPassword}
              onBlur={(e) => {
                setActiveMode(false);
                onBlur && onBlur(e);
              }}
              onChange={onChange}
              onFocus={() => {
                setActiveMode(true);
              }}
              onError={handleError}
              className={className}
            />
          </div>
          {type === 'password' && (
            <>
              <div
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="flex justify-center items-center border-l w-10"
              >
                {showPassword ? (
                  <FontAwesomeIcon className="h-3" icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon className="h-3" icon={faEye} />
                )}
              </div>
              {!disableForgetPassword && (
                <div className="flex justify-center text-cyan-400 font-medium items-center border-l min-w-fit p-1 capitalize tracking-normal text-xs">
                  <Link href={'/forgetPassword'}>Forget Password</Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputBox;
