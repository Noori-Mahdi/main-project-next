'use client';

import Button from '@/components/Button';
import Input from '@/components/Inpurt';
import {register} from '@/services/auth';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useEffect, useState} from 'react';
import {faJedi} from '@fortawesome/free-solid-svg-icons';
import {
  faUser,
  faKey,
  faEnvelope,
  faLock,
  faMobileScreen,
} from '@fortawesome/free-solid-svg-icons';
import InputBox from '@/components/InputBox';
import Link from 'next/link';

const Register = () => {
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    email: '',
    phone: '',
  });
  const [activeSubmit, setActiveSubmit] = useState(false);

  const handleFormSubmit = (e: any) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const checkPassword = (confirmPassword: string) => {
    if (formData.password !== confirmPassword) {
      setActiveSubmit(false);
      setError('Passwords do not match.');
    } else {
      setError(null);
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData, 'formData');
    register(formData)
      .then((res) => {
        window.location.href = '/auth/login';
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (
      !formData.userName ||
      !formData.email ||
      !formData.password ||
      formData.email === '' ||
      formData.password === '' ||
      formData.userName === ''
    )
      setActiveSubmit(false);
    else setActiveSubmit(true);
  }, [formData]);

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
          Register
        </h3>
        <div className="mb-3">
          {' '}
          <InputBox
            label="User Name"
            onChange={(e) => handleFormSubmit(e)}
            name="userName"
            type="text"
            required
            icon={faUser}
            placeholder="Enter your name ..."
            className="bg-transparent outline-none p-2 text-sm font-medium tracking-wide "
          />
        </div>
        <div className="mb-3">
          {' '}
          <InputBox
            label="Email"
            onChange={(e) => handleFormSubmit(e)}
            name="email"
            type="email"
            required
            icon={faEnvelope}
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
            disableForgetPassword={true}
            placeholder="Enter your Password ..."
            className="bg-transparent outline-none p-2 text-sm font-medium tracking-wide "
          />
        </div>
        <div className="mb-3">
          {' '}
          <InputBox
            label="Confirm Password"
            onBlur={(e) => {
              checkPassword(e.target.value);
            }}
            name="confirmPassword"
            disableForgetPassword={true}
            type="password"
            propError={error}
            required
            icon={faLock}
            placeholder="confirmPassword ..."
            className="bg-transparent outline-none p-2 text-sm font-medium tracking-wide "
          />
        </div>
        <div className="mb-3">
          {' '}
          <InputBox
            label="Phone"
            onChange={(e) => handleFormSubmit(e)}
            name="phone"
            type="text"
            icon={faMobileScreen}
            placeholder="Password your Phone Number ..."
            className="bg-transparent outline-none p-2 text-sm font-medium tracking-wide "
          />
        </div>
        <div className="w-full">
          <Button
            className="uppercase"
            type="submit"
            label="Register"
            disabled={!activeSubmit}
          />
        </div>
      </form>
      <div className="text-center mt-2 text-sm text-cyan-400">
        <Link href={'/auth/login'}>I have account</Link>
      </div>
    </>
  );
};

export default Register;
