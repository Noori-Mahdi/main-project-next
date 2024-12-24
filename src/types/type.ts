import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {ChangeEvent, ReactNode} from 'react';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import {MouseEventHandler} from 'react';

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

export interface InfoBoxPropsType {
  title: string;
  content: string;
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
  classNameLabel?: string;
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
  label?: string;
  onClick?: (e: any) => void;
  type?: 'button' | 'submit' | 'reset';
  styleType?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  className?: string;
  icon?: IconName;
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
export interface Pages {
  label: string;
  icon: any;
  URL: string;
  public: boolean;
  childLink: Pages[];
}

export interface UserInfo {
  image: any;
  userName: string;
  email: string;
  mode: string;
}

export interface UserBoxPropsType {
  user: UserInfo;
}

export interface FriendListPropsType {
  list: UserInfo[];
}

export interface ImgBoxPropsType {
  alt: string;
  image: any;
  imageWidth: number;
  imageHeight: number;
  label?: string;
  subLabel?: string;
  classImage?: string;
  classImageBox?: string;
  classLabel?: string;
  classSubLabel?: string;
}

export interface InfoBoxUserPropsType
  extends Pick<ImgBoxPropsType, 'alt' | 'image' | 'label' | 'subLabel'> {}

export interface ModalPropsType {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
}

export type IconName = keyof typeof solidIcons;

export interface DynamicIconProps {
  iconName: IconName;
  className?: string;
  onClick?: MouseEventHandler<SVGSVGElement>;
}

export interface ConfirmationModalPropsType {
  isOpen:boolean;
  onConfirm:()=>void;
  onCancel:()=>void;
  message:string;
}
