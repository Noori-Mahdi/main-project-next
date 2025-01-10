'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import {register} from '@/services/auth';
import {useState} from 'react';
import Link from 'next/link';
import {ToastPropsType} from '@/types/type';
import Toast from '@/components/Toast';

const Register = () => {
  const [error, setError] = useState<ToastPropsType | null>(null);
  const [confirmPassword,setConfirmPassword] = useState('')
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    email: '',
    phone: '',
  });

  const handleFormSubmit = (e: any) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };


  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
       return setError({type: 'error', message: 'Passwords do not match.'});
      } else {
        setError(null);
      }

    register(formData)
      .then((res) => {
        window.location.href = '/login';
      })
      .catch((error: any) => {
        setError({type: 'error', message: error.response?.data});
      });
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
      <form onSubmit={handleSubmit} className="w-full">
        <h3 className="text-3xl text-center mb-10 font-bold uppercase text-yellow-900">
          Register
        </h3>
        <div className="mb-3">
          {' '}
          <Input
            label="User Name"
            onChange={(e) => handleFormSubmit(e)}
            name="userName"
            type="text"
            required
            icon={'faUser'}
            placeholder="Enter your name ..."
          />
        </div>
        <div className="mb-3">
          {' '}
          <Input
            label="Email"
            onChange={(e) => handleFormSubmit(e)}
            name="email"
            type="email"
            required
            icon={'faEnvelope'}
            placeholder="Enter your Email ..."
          />
        </div>
        <div className="mb-3">
          {' '}
          <Input
            label="Password"
            onChange={(e) => handleFormSubmit(e)}
            name="password"
            type="password"
            required
            icon={'faKey'}
            placeholder="Enter your Password ..."
          />
        </div>
        <div className="mb-3">
          {' '}
          <Input
            label="Confirm Password"
            onBlur={(e) => {
                setConfirmPassword(e.target.value);
            }}
            name="confirmPassword"
            type="password"
            required
            icon={'faLock'}
            placeholder="confirmPassword ..."
          />
        </div>
        <div className="mb-3">
          {' '}
          <Input
            label="Phone"
            onChange={(e) => handleFormSubmit(e)}
            name="phone"
            type="text"
            icon={'faMobileScreen'}
            placeholder="Password your Phone Number ..."
          />
        </div>
        <div className="w-full">
          <Button className="uppercase" type="submit" label="Register" />
        </div>
      </form>
      <div className="flex items-center mt-2 text-sm ">
        <div className="font-medium  text-gray-300">I have account </div>
        <div className="font-medium hover:text-yellow-800 text-yellow-900 ml-2 capitalize">
          <div className="cursor-pointer text-xs">
            <Link href={'/login'}>sign In</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
