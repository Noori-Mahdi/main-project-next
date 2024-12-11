'use client';

import {InputPropsType} from '@/types/type';
import {validateInput} from '@/utils/validators'; // ایمپورت توابع اعتبارسنجی
import {useEffect, useState} from 'react';

const Input = ({
  type,
  label,
  name,
  defaultValuevalue,
  onChange,
  onFocus,
  onBlur,
  onError,
  passwordLvl,
  placeholder,
  options,
  disabled = false,
  maxLength,
  minLength,
  className,
  min,
  max,
  rows,
  showPassword = false, // برای مخفی کردن یا نمایش رمز عبور
  customError = false,
  required = false,
  readonly = false,
  tooltip,
}: InputPropsType) => {
  const [validationError, setValidationError] = useState<string | null>(null);
  const [value, setValue] = useState<string>('');

  // مدیریت زمان blur برای اعتبارسنجی
  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const newValue = e.target.value;
    const errorMessage = validateInput(type, newValue);
    if (required) {
      if (newValue != null && newValue !== '') {
        setValidationError(errorMessage);
        onError && onError(errorMessage);
      } else {
        setValidationError('This field is required.');
        onError && onError('This field is required.');
      }
    }

    onBlur && onBlur(e);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setValue(e.target.value);
    onChange && onChange(e)
  
  };

  useEffect(() => {
    if (type === 'password' && passwordLvl) {
      let passwordLevel = 0;

      if (/\d/.test(value)) {
        passwordLevel++;
      }

      if (/[a-z]/.test(value)) {
        passwordLevel++;
      }

      if (/[A-Z]/.test(value)) {
        passwordLevel++;
      }

      if (value.length >= 5) {
        passwordLevel++;
      }

      passwordLvl && passwordLvl(passwordLevel);
    }
  }, [value, type]);

  return (
    <div>
      {label && (
        <div className="flex">
          <label htmlFor={name}>{label}</label>
          {required && <div>*</div>}
        </div>
      )}
      {tooltip && (
        <div
          style={{
            display: 'inline-block',
            background: '#f1f1f1',
            border: '1px solid #ccc',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            textAlign: 'center',
            fontSize: '12px',
            lineHeight: '20px',
            cursor: 'pointer',
            position: 'relative',
          }}
          title={tooltip}
        >
          ?
        </div>
      )}

      {/* ورودی select */}
      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={defaultValuevalue}
          className={className}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          style={{display: 'block', width: '100%'}}
        >
          <option value="" disabled>
            {placeholder || 'Select an option'}
          </option>
          {options &&
            options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          className={className}
          id={name}
          name={name}
          value={defaultValuevalue}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          required={required}
          readOnly={readonly}
          style={{display: 'block', width: '100%'}}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={showPassword ? 'text' : type}
          value={defaultValuevalue}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          max={max}
          min={min}
          required={required}
          maxLength={maxLength}
          minLength={minLength}
          readOnly={readonly}
          className={`${className} placeholder:text-xs placeholder:capitalize `}
          style={{display: 'block', width: '100%'}}
        />
      )}
      {!customError && (
        <div className="text-danger text-xs w-full h-5 pl-2">
          {validationError && (
            <span className="h-full w-full">{validationError}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
