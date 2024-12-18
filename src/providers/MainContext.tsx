'use client';
import React, {createContext, useEffect, useMemo} from 'react';

import {
  ContextReturnType,
  MainContextProps,
  MainContextState,
} from '@/types/type';
import {getUserInfo} from '@/services/userInfo';
import {logout} from '@/services/auth';
import {useRouter} from 'next/navigation';

export const Context = createContext<ContextReturnType>(
  {} as ContextReturnType
);

const MainContext = (props: MainContextProps) => {
  const router = useRouter();
  const {children} = props;
  const [state, setState] = React.useState<MainContextState>({
    user: undefined,
  });

  const updateUserInfo = async () => {
    try {
      // const res = await getUserInfo();
      // console.log('User info response:', res);
    } catch (e) {
      console.error('Error in updateUserInfo:', e);
    }
  };

  useEffect(() => {
    updateUserInfo();
  }, []);

  const handleLogout = () => {
    logout().then(() => {
      router.push('/');
      setState((prevState) => ({...prevState, user: undefined}));
    });
  };

  const isLoggedIn = useMemo(() => {
    return !!state.user;
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        ...state,
        isLoggedIn,
        updateUserInfo,
        handleLogout,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default MainContext;
