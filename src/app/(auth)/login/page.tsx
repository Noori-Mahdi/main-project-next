'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import {Context} from '@/providers/MainContext';
import {login} from '@/services/auth';
import {useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import Toast from '@/components/Toast';
import {ToastPropsType} from '@/types/type';
import Link from 'next/link';
import '@/sass/global.scss';
import LoadingComponent from '@/components/LoadingComponent';

const Login = () => {
  const {updateUserInfo} = useContext(Context);
  const router = useRouter();
  const [error, setError] = useState<ToastPropsType | null>(null);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (e: any) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(form);
      await updateUserInfo();
      router.replace('/home');
    } catch (error: any) {
      setError({type: 'error', message: error.response?.data});
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <Toast
          message={error.message}
          type={error.type}
          onClose={() => setError(null)}
        />
      )}
      <div className=" px-3 py-5  relative">
        {loading && <LoadingComponent />}
        <form onSubmit={handleSubmit} className="w-full grow">
          <h3 className="text-3xl text-center mb-10 font-bold uppercase text-yellow-900">
            Sing in
          </h3>
          <div className="mb-4">
            {' '}
            <Input
              label="email"
              onChange={(e) => handleFormSubmit(e)}
              name="email"
              type="email"
              icon={'faEnvelope'}
              required
              classNameInput="bg-transparent outline-none p-2 text-sm font-medium tracking-wide "
            />
          </div>
          <div className="mb-4">
            {' '}
            <Input
              label="Password"
              onChange={(e) => handleFormSubmit(e)}
              name="password"
              type="password"
              required
              icon={'faLock'}
              placeholder="Enter your Password ..."
            />
          </div>
          <div className="w-full">
            <Button type="submit" label="Sing in" />
          </div>
        </form>
        <div className="mt-10">
          <div className="flex items-center mt-2 text-sm ">
            <div className="font-medium capitalize text-gray-300">
              new Account ?{' '}
            </div>
            <div className="font-medium hover:text-yellow-800 text-yellow-900 ml-2 capitalize">
              <div className="cursor-pointer text-xs">
                <Link href={'/register'}>signup</Link>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-2 text-sm ">
            <div className="font-medium capitalize text-gray-300">
              forget password ?{' '}
            </div>
            <div className="font-medium hover:text-yellow-800 text-yellow-900 ml-2 capitalize">
              <div className="cursor-pointer text-xs">validation</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
