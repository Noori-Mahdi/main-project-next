'use client';

import {useContext, useEffect, useState} from 'react';
import {Context} from '@/providers/MainContext';
import DynamicIcon from '../DynamicIcon';
import ImgBox from '../ImgBox';
import test from '../../../public/uploads/News/img1.jpg';
import {getFriendRequest} from '@/services/requestFriend';
import NotificationBox from '../NotificationBox';
import {RequestFriendNotifType} from '@/types/type';
import {Clock} from '../Clock/Clock';

interface DashboardPropsType {
  userName: string;
  notifList: RequestFriendNotifType[];
  imgUrl: string | null;
}

const Dashboard = ({userName, notifList, imgUrl}: DashboardPropsType) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="">
          <Clock type="time" />
        </div>
        <div className="flex items-center ">
          <div className="relative">
            <NotificationBox notifList={notifList} userName={userName} />
          </div>
          <ImgBox
            label={userName}
            imageHeight={128}
            imageWidth={128}
            alt="user Image"
            image={imgUrl}
            classImage="rounded-sm object-cover w-full h-full select-none"
            classImageBox="w-11 h-11 rounded-md border-2 p-px border-red-600 mx-1 order-2 select-none"
            classLabel="px-1 text-base font-bold tracking-wide select-none"
            classSubLabel="px-1 text-sm font-normal tracking-wide"
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
