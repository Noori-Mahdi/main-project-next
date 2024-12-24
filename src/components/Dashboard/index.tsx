'use client';

import {useContext} from 'react';
import {Context} from '@/providers/MainContext';
import DynamicIcon from '../DynamicIcon';
import ImgBox from '../ImgBox';
import test from '../../../public/uploads/News/img1.jpg'

const Dashboard = () => {
  const {user} = useContext(Context);

  return (
    <>
      <div className="flex justify-end ">
        {user && (
          <div className="flex items-center justify-end">
            <DynamicIcon
              className="mr-4 text-sm cursor-pointer"
              iconName="faEnvelope"
            />
            <DynamicIcon
              className="mr-4 text-sm cursor-pointer"
              iconName="faBell"
            />
            <ImgBox
              label={user.userName}
              imageHeight={128}
              imageWidth={128}
              alt="user Image"
              image={test}
              classImage="rounded-sm object-cover w-full h-full"
              classImageBox="w-11 h-11 rounded-md border-2 p-px border-red-600 mx-1 order-2"
              classLabel="px-1 text-base font-bold tracking-wide select-none"
              classSubLabel="px-1 text-sm font-normal tracking-wide"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
