import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {ChangeEvent} from 'react';

type InputType =
  | 'text'
  | 'email'
  | 'number'
  | 'password'
  | 'textarea'
  | 'select';

interface Option {
  value: string | number;
  label: string;
}

export interface NewsCardPropsType {
  title: string;
  rate?: number;
  content: string;
  image: string;
  onClick: () => void;
}
export interface ClockPropType {
  type: 'full' | 'time';
}

export type ListNewsCardPropsType = NewsCardPropsType[] | [];

export interface InputPropsType {
  type: InputType;
  name: string;
  label?: string;
  placeholder?: string;
  options?: Option[];
  disabled?: boolean;
  defaultValuevalue?: string;
  defaultValue?: string;
  max?: number;
  min?: number;
  maxLength?: number;
  minLength?: number;
  rows?: number;
  customError?: boolean;
  required?: boolean;
  readonly?: boolean;
  showPassword?: boolean;
  tooltip?: string;
  className?: string;
  passwordLvl?: (e: number) => void;
  onError?: (e: string | null) => void;
  onFocus?: (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onBlur?: (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

export interface InputBoxType extends InputPropsType {
  icon: IconProp; //custom type fortawesome
  disableForgetPassword?: boolean;
  propError?: string | null;
  disableCheackPasswordLvl?: boolean;
}

export interface ButtonPropsType {
  label: string;
  onClick?: (e: any) => void;
  type?: 'button' | 'submit' | 'reset';
  styleType?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  className?: string;
}

export interface ContextReturnType {
  user: any;
  isLoggedIn: boolean;
  updateUserInfo: () => void;
  handleLogout: () => void;
}

export interface MainContextProps {
  children: React.ReactNode;
}

export interface MainContextState {
  user: any | undefined;
}
