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

const Dashboard = () => {
  const {user} = useContext(Context);
  const [notifications, setNotification] = useState<FriendRequest[]>([]);
  const [showNotificationBox, setShowNotificationBox] = useState(false);
  const [reload, setReload] = useState(false);

  const getFriendRequestAsync = async () => {
    try {
      const res = await getFriendRequest(user.id);
      setNotification(() => [...res.data]);
    } catch (e) {
      console.error('Error in request:', e);
    }
  };

  useEffect(() => {
    if (user) getFriendRequestAsync();
  }, [user, reload]);

  return (
    <>
      <div className="flex justify-end ">
        {user && (
          <div className="flex items-center justify-end">
            <div className="relative">
              <NotificationBox
                isOpen={showNotificationBox}
                onClose={() => setShowNotificationBox(false)}
                onReload={() => setReload(!reload)}
                notification={{type: 'friendRequest', data: notifications}}
              />
              <DynamicIcon
                className="mr-4 text-sm cursor-pointer"
                iconName="faEnvelope"
                onClick={() => setShowNotificationBox(true)}
              />
            </div>

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
