'use client';
import Button from '@/components/Button';
import DynamicIcon from '@/components/DynamicIcon';
import Footer from '@/components/Footer';
import ImgBox from '@/components/ImgBox';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import {Context} from '@/providers/MainContext';
import {ToastProvider, useToast} from '@/providers/ToastProvider';
import {putChangePassword} from '@/services/changePassword';
import {PutUserInfo} from '@/services/userInfo';
import {UserInfo} from '@/types/type';
import React, {useContext, useEffect, useState} from 'react';

const userInfo = () => {
  const {user, updateUserInfo} = useContext(Context);
  const {addToast} = useToast();

  const [form, setForm] = useState({
    id: '',
    userName: '',
    email: '',
    phone: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [firstLetter, setFirstLetter] = useState(null);
  const [editeMode, setEditeMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  };

  const handlePasswordChange = (e: any) => {
    const {name, value} = e.target;
    setPasswordForm({...passwordForm, [name]: value});
  };

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      addToast('New password and confirm password do not match!', 'error');
      return;
    }

    try {
      setLoadingModal(true);
      console.log(
        'id:',
        user.id,
        'currentPassword:',
        passwordForm.currentPassword,
        'newPassword: ',
        passwordForm.newPassword
      );
      await putChangePassword({
        id: user.id,
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      addToast('Password changed successfully!', 'success');
      setShowModal(false);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error: any) {
      addToast(error.response?.data || 'Failed to change password', 'error');
    } finally {
      setLoadingModal(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await PutUserInfo(form);
      await updateUserInfo();
      addToast('Login successful! Welcome back', 'success');
    } catch (error: any) {
      addToast(error.response?.data, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setFirstLetter(user.userName.trim().charAt(0));
      setForm({
        id: user.id,
        userName: user.userName,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user]);

  if (!user || loading) return <div>Loading...</div>;

  return (
    <div className="bg-neutral-700 h-full">
      <form onSubmit={handleSubmit} className="flex gap-7 w-full p-8 ">
        <div>
          <div className="relative">
            <div
              className={`flex justify-center items-center absolute right-0 ${editeMode ? 'cursor-pointer hover:brightness-125 text-yellow-700 border-2 bg-white border-yellow-700' : 'invisible'}  bottom-0 w-8 h-8 rounded-full p-1 `}
            >
              <DynamicIcon iconName="faEdit" />
            </div>
            {user?.image ? (
              <ImgBox
                alt="user Image"
                classImageBox="rounded-full"
                classImage="rounded-full"
                image={user?.image}
                imageHeight={130}
                imageWidth={130}
              />
            ) : (
              <div className="flex justify-center items-center text-white select-nonetext-xl font-semibold uppercase bg-neutral-800 rounded-full w-full h-full">
                {firstLetter}
              </div>
            )}
          </div>
        </div>
        <div className="grow">
          <div className="flex gap-2 mt-8 items-end justify-start">
            {' '}
            <Input
              label="user name"
              name="userName"
              type="text"
              icon="faUser"
              readOnly={!editeMode}
              disabled={!editeMode}
              defaultValue={user.userName}
              onChange={(e) => handleChange(e)}
            />
            <DynamicIcon
              iconName="faEdit"
              className={`${editeMode ? 'cursor-pointer hover:brightness-125 text-yellow-700 border-2 bg-white border-yellow-700' : 'invisible'} p-1 text-yellow-700 border-2 hover:brightness-125 bg-white border-yellow-700 rounded-full cursor-pointer`}
            />
          </div>

          <div className="flex gap-2 mt-8 items-end justify-start">
            {' '}
            <Input
              label="email"
              name="email"
              type="email"
              icon="faEnvelope"
              readOnly={!editeMode}
              disabled={!editeMode}
              defaultValue={user.email}
              onChange={(e) => handleChange(e)}
            />
            <DynamicIcon
              iconName="faEdit"
              className={`${editeMode ? 'cursor-pointer hover:brightness-125 text-yellow-700 border-2 bg-white border-yellow-700' : 'invisible'} p-1 text-yellow-700 border-2 hover:brightness-125 bg-white border-yellow-700 rounded-full cursor-pointer`}
            />
          </div>

          <div className="flex gap-2 mt-8 items-end justify-start">
            {' '}
            <Input
              label="phone"
              name="phone"
              type="text"
              icon="faPhone"
              readOnly={!editeMode}
              disabled={!editeMode}
              defaultValue={user.phone}
              onChange={(e) => handleChange(e)}
            />
            <DynamicIcon
              iconName="faEdit"
              className={`${editeMode ? 'cursor-pointer hover:brightness-125 text-yellow-700 border-2 bg-white border-yellow-700' : 'invisible'} p-1 text-yellow-700 border-2 hover:brightness-125 bg-white border-yellow-700 rounded-full cursor-pointer`}
            />
          </div>
          <div
            onClick={() => {
              setShowModal(true);
            }}
            className="flex justify-start items-center text-sm font-medium gap-2 mt-8 cursor-pointer text-yellow-800 hover:text-yellow-700"
          >
            <div className="capitalize">change password</div>
            <DynamicIcon iconName="faLock" />
          </div>
          {!editeMode ? (
            <>
              <Button
                onClick={() => {
                  setEditeMode(true);
                }}
                label="Edit"
                className="px-2 py-1 w-16 mt-8 tracking-wide capitalize text-base font-medium rounded-sm"
                size="lg"
                color="primary"
              />
            </>
          ) : (
            <>
              <Button
                label="cansel"
                className="px-2 py-1 w-16 mt-8 tracking-wide capitalize text-base font-medium rounded-sm"
                size="lg"
                color="secondary"
                onClick={() => {
                  setEditeMode(false);
                }}
              />
              <Button
                label="save"
                className="px-2 py-1 w-16 mt-8 ml-3 tracking-wide capitalize text-base font-medium rounded-sm"
                size="lg"
                color="primary"
                type="submit"
              />
            </>
          )}
        </div>
      </form>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          className="bg-neutral-800 border border-yellow-800"
          isOpen={showModal}
        >
          <form onSubmit={handleChangePassword}>
            <div className="flex gap-2  mt-8 items-end justify-start">
              {' '}
              <Input
                label="Current Password"
                name="currentPassword"
                type="password"
                icon="faLock"
                onChange={handlePasswordChange}
              />
            </div>
            <div className="flex gap-2 mt-8 items-end justify-start">
              {' '}
              <Input
                label="New Password"
                name="newPassword"
                type="password"
                icon="faLock"
                onChange={handlePasswordChange}
              />
            </div>
            <div className="flex gap-2 mt-8 items-end justify-start">
              {' '}
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                icon="faLock"
                onChange={handlePasswordChange}
              />
            </div>
            <Button
              type="submit"
              label="save"
              color="primary"
              className="px-2 py-1 w-16 mt-8 ml-3 tracking-wide capitalize text-base font-medium rounded-sm"
            />
          </form>
        </Modal>
      )}
    </div>
  );
};

export default userInfo;
