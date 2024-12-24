'use client';

import { FriendListPropsType } from '@/types/type';
import InfoBoxUser from '../InfoBoxUser';
import DynamicIcon from '../DynamicIcon';
import InviteFriend from '../InviteFriend';
import { useState } from 'react';

const FriendList = ({ list }: FriendListPropsType) => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const openInviteModal = () => setIsInviteModalOpen(true);
  const closeInviteModal = () => setIsInviteModalOpen(false);

  return (
    <div className="h-full w-full pt-2">
      <div className="flex flex-col items-center h-full w-full bg-slate-700 rounded-md">
        <ul className="overflow-auto grow">
          {list?.map((item, index: number) => (
            <li className="px-1 py-2" key={index}>
              <InfoBoxUser
                alt={item.userName}
                image={item.image}
                label={item.userName}
                subLabel={item.email}
              />
            </li>
          ))}
        </ul>
        <div
          className="text-center rounded-md cursor-pointer border-2 border-dashed p-1 m-1 w-10"
          onClick={openInviteModal} 
        >
          <DynamicIcon iconName="faUserPlus" />
        </div>
      </div>

      <InviteFriend show={isInviteModalOpen} onClose={closeInviteModal} />
    </div>
  );
};

export default FriendList;
