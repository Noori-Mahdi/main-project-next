'use client';

import {useContext, useEffect, useState} from 'react';
import {Context} from '@/providers/MainContext';
import DynamicIcon from '../DynamicIcon';
import ImgBox from '../ImgBox';
import test from '../../../public/uploads/News/img1.jpg';
import {getFriendRequest} from '@/services/requestFriend';
import NotificationBox from '../NotificationBox';
import {UserInfo} from '@/types/type';

interface FriendRequest {
  id: string;
  sender: UserInfo;
  receiver: UserInfo;
  status: string;
  createdAt: Date;
}
interface DashboardPropsType {
  userName: string;
  notifList: FriendRequest[];
}

const Dashboard = ({userName, notifList}: DashboardPropsType) => {

  return (
    <>
      <div className="flex justify-end ">
        <div className="flex items-center justify-end">
          <div className="relative">
            <NotificationBox 
              notification={{notifList}}
            />
          </div>
          <ImgBox
            label={userName}
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
      </div>
    </>
  );
};

export default Dashboard;
