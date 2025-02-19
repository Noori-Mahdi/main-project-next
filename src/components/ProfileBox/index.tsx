'use client';

import React, {useContext, useEffect, useRef, useState} from 'react';
import DynamicIcon from '../DynamicIcon';
import ImgBox from '../ImgBox';
import SwitchButton from '../SwitchButton';
import {Context} from '@/providers/MainContext';
import ConfirmationModal from '../ConfirmationModal';
import Button from '../Button';

const ProfileBox = () => {
  const [showList, setShowList] = useState(false);
  const [showConfirmMessage, setShowConfirm] = useState(false);
  const profileBoxRef = useRef<HTMLDivElement | null>(null);
  const {handleLogout, user} = useContext(Context);
  const [firstLetter, setFirstLetter] = useState<null | string>(null);

  const handleLogOut = () => {
    handleLogout();
  };

 
  useEffect(() => {
    if (user) setFirstLetter(user.userName.trim().charAt(0));
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileBoxRef.current &&
        !profileBoxRef.current.contains(event.target as Node)
      ) {
        setShowList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={profileBoxRef}
      className={`flex justify-center items-center select-none w-10 h-10 cursor-pointer rounded-full p-0.5 relative border-2 border-yellow-900  z-50 ${!firstLetter && 'border-none '}`}
    >
      <div
        onClick={() => {
          if (firstLetter) setShowList(!showList);
        }}
        className="w-full h-full"
      >
        {firstLetter ? (
          user.image ? (
            <ImgBox
              alt="user image"
              imageWidth={30}
              imageHeight={30}
              image={user.image}
              classImageBox="flex justify-center items-center h-full w-full  rounded-full "
              classImage="rounded-full w-full h-full"
            />
          ) : (
            <div className="flex justify-center items-center text-white select-nonetext-xl font-semibold uppercase bg-neutral-800 rounded-full w-full h-full">
              {firstLetter}
            </div>
          )
        ) : (
          <Button
            label="login"
            color="primary"
            size="sm"
            url="/login"
            className="px-1 py-0.5 mt-1 rounded-sm capitalize tracking-wide text-sm font-medium"
          />
        )}
      </div>
      {showList && (
        <div className="flex flex-col justify-between absolute top-0 rounded border-2 p-2 border-yellow-900 right-0 translate-y-10 w-52 h-fit bg-neutral-900 cursor-auto">
          <div className="flex flex-col justify-end grow gap-y-2">
            {' '}
            <SwitchButton
              defaultValue={false}
              label="en/fa"
              onClick={() => {}}
            />
            <SwitchButton
              defaultValue={false}
              label="dark mode"
              onClick={() => {}}
            />
          </div>

          <ul className=" w-full text-base capitalize font-semibold text-gray-300">
            <li className="flex justify-between items-center cursor-pointer hover:text-yellow-900  transition-colors duration-300 ease-in-out mt-1 select-none">
              <span>switch account</span>
              <DynamicIcon iconName="faShuffle" />
            </li>
            <li
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                setShowConfirm(true);
              }}
              className="flex justify-between items-center cursor-pointer hover:text-red-700  transition-colors duration-300 ease-in-out mt-1 select-none"
            >
              <span>log out</span>
              <DynamicIcon iconName="faPowerOff" />
            </li>
          </ul>
        </div>
      )}{' '}
      <ConfirmationModal
        isOpen={showConfirmMessage}
        message="Are you sure you want to leave?"
        onCancel={() => {
          setShowConfirm(false);
        }}
        onConfirm={() => {
          handleLogOut();
        }}
      />
    </div>
  );
};

export default ProfileBox;
