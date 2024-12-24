'use client';

import FriendList from '@/components/FriendList';
import {Context} from '@/providers/MainContext';
import {getFriends} from '@/services/friends';
import {useContext, useEffect, useState} from 'react';

const Profile = () => {
  const [friends, setFriends] = useState<any[]>([]);
  const {user} = useContext(Context);

  const getFriendsAsync = async () => {
    try {
      const res = await getFriends(user?.id);
      setFriends(res.data.data.friends);
    } catch {
      console.log('error');
    }
  };
  useEffect(() => {
    getFriendsAsync();
  }, [user?.id]);

  return (
    <div className='flex h-full'>
      <div className="grow h-full overflow-auto"></div>
      <div className="h-full">
        <FriendList list={friends} />
      </div>
    </div>
  );
};

export default Profile;
