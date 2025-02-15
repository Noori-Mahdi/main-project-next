import {ReactNode} from 'react';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import {MouseEventHandler} from 'react';

//----------------------------------------------- Type -----------------------------------------------

type InputType = // input type
  'text' | 'email' | 'number' | 'password' | 'textarea' | 'select';

export interface UserInfo {
  id: string;
  image: any;
  userName: string;
  email?: string;
  phone?: string;
  roleAdmie?: boolean;
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
  type: 'info' | 'error' | 'warning' | 'success';
  onClose?: () => void;
}

export interface ClockPropType {
  type: 'full' | 'time';
}

export interface ButtonPropsType {
  label?: string;
  onClick?: (e: any) => void;
  type?: 'button' | 'submit' | 'reset';
  color?: 'primary' | 'secondary' | 'danger' | 'info' | 'transparent';
  size?: 'full' | 'lg' | 'base' | 'sm';
  disabled?: boolean;
  className?: string;
  icon?: IconName;
  iconClass?: string;
  url?: string;
}

export interface LinkObj {
  label: string;
  icon?: IconName;
  pathname: string;
}

export interface OptinTypeInSelectBox {
  id: string;
  name: string;
}

export interface target{
  target:{name:string,value:string}
}

export interface SelectBoxPropsType {
  options: OptinTypeInSelectBox[];
  label: string;
  name: string;
  icon?: IconName;
  onChange?: (e:target) => void;
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

export interface HeaderTypeProps {
  userName?: string | null;
  image?: any | null;
  roleAdmin?: boolean | null;
  pages: Pages[];
}

export interface ModalPropsType {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
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
  Value?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  classNameInput?: string;
  classNameLabel?: string;
  defaultValue?: string;
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

export interface ProductType {
  id: string;
  name: string;
  description: string;
  image: any | null;
  price: number;
  discount: number;
  likes: number;
  rating: number;
  views: number;
  sold: number;
  stock: number;
  status: 'AVAILABLE' | 'Out of Stock';
  categoryId: string;
  category:
    | 'Coffee Accessories'
    | 'Instant Coffee'
    | 'Ground Coffee'
    | 'Coffee Beans'
    | 'Ready-to-Drink Coffee';
  reviews: string[];
}

export interface TablePropsType {
  list: UserInfo[] | ProductType[];
  onDelete: (id: string) => void;
  onShow: (id: string) => void;
}

export interface UserListPropsType {
  list: UserInfo[];
}
// ------------------------------------------ Context Type ------------------------------------------

export interface ContextReturnType {
  // friendList:any;
  user: any;
  isLoggedIn: boolean;
  updateUserInfo: () => void;
  handleLogout: () => void;
  setShowBasketBox: (e: boolean) => void;
  showBasketBox: boolean;
}

export interface MainContextProps {
  children: React.ReactNode;
}

export interface MainContextState {
  user: any | undefined;
}
