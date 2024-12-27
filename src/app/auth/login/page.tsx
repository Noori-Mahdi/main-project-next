'use client';

import Button from '@/components/Button';
import Input from '@/components/Inpurt';
import {Context} from '@/providers/MainContext';
import {login} from '@/services/auth';
import {useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import InputBox from '@/components/InputBox';
import {faUser, faKey} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faJedi} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Login = () => {
  const {updateUserInfo} = useContext(Context);
  const router = useRouter();
  const [activeSubmit, setActiveSubmit] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleFormSubmit = (e: any) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // جلوگیری از ارسال پیش‌فرض فرم
    try {
      // عملیات لاگین را انجام می‌دهیم
      await login(form);

      // اطلاعات کاربر را به روز می‌کنیم
      await updateUserInfo();

      // به صفحه / منتقل می‌شویم
      router.replace('/page/home');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (
      !form.email ||
      !form.password ||
      form.email === '' ||
      form.password === ''
    )
      setActiveSubmit(false);
    else setActiveSubmit(true);
  }, [form]);

  return (
    <>
      <div className="absolute flex items-center justify-between left-2 top-0">
        <FontAwesomeIcon className="text-3xl" icon={faJedi} />
        <h2 data-text="TeamForge" className="textAnimation">
          TeamForge
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="w-full">
        <h3 className="text-3xl text-center mb-5 font-bold capitalize">
          Sing in
        </h3>
        <div className="mb-3">
          {' '}
          <InputBox
            label="Email"
            onChange={(e) => handleFormSubmit(e)}
            name="email"
            type="email"
            required
            icon={faUser}
            placeholder="Enter your Email ..."
            className="bg-transparent outline-none p-2 text-sm font-medium tracking-wide "
          />
        </div>
        <div className="mb-3">
          {' '}
          <InputBox
            label="Password"
            onChange={(e) => handleFormSubmit(e)}
            name="password"
            type="password"
            required
            icon={faKey}
            placeholder="Enter your Password ..."
            className="bg-transparent outline-none p-2 text-sm font-medium tracking-wide "
          />
        </div>
        <div className="w-full">
          <Button type="submit" label="Sing in" disabled={!activeSubmit} />
        </div>
      </form>
      <div className="text-center mt-2 text-sm text-cyan-400">
        <Link href={'/auth/register'}>Create New Account</Link>
      </div>
    </>
  );
};

export default Login;
