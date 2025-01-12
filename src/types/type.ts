import { ReactNode} from 'react';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import {MouseEventHandler} from 'react';

//----------------------------------------------- Type -----------------------------------------------

type InputType = // input type
  | 'text'
  | 'email'
  | 'number'
  | 'password'
  | 'textarea'
  | 'select';

  export interface UserInfo { 
    id: string;
    image: any;
    userName: string;
    email?: string;
  }
  
  export type IconName = keyof typeof solidIcons; //for Font AwesomeIcon

  export interface Pages {
    label: string;
    icon: any;
    URL: string;
    public: boolean;
    childLink?: Pages[];
  }
  
//-------------------------------------- Components Props Type ------------------------------------

export interface ToastPropsType {
  message: string;
  type: 'error' | 'warning' | 'success';
  onClose?: () => void;
}

export interface ClockPropType {
  type: 'full' | 'time';
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
  onClick?: () => void;
}

export interface HeaderTypeProps{
  userName?:string;
  image?: any;
  roleAdmin?:boolean;
  pages: Pages[];
}


export interface ModalPropsType {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
}

export interface DynamicIconPropsType {
  iconName: IconName;
  className?: string;
  onClick?: MouseEventHandler<SVGSVGElement>;
}

export interface ConfirmationModalPropsType {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

export interface InputPropsType {
  type: InputType;
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  classNameInput?: string;
  classNameLabel?: string;
  icon?: IconName;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
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

// ------------------------------------------ Context Type ------------------------------------------

export interface ContextReturnType {
  // friendList:any;
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

