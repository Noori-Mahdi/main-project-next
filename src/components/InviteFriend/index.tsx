'use client';

import {useContext, useState} from 'react';
import Button from '../Button';
import Input from '../Inpurt';
import Modal from '../Modal';
import {getSearchUsers} from '@/services/friends';
import {UserInfo} from '@/types/type';
import DynamicIcon from '../DynamicIcon';
import {sendFriendRequest} from '@/services/requestFriend';
import {Context} from '@/providers/MainContext';

interface InviteFriendPropsType {
  show: boolean;
  onClose: () => void;
}

const InviteFriend = ({show, onClose}: InviteFriendPropsType) => {
  const [searchName, setSearchName] = useState('');
  const [userList, setUserList] = useState<[] | UserInfo[]>([]);
  const {user} = useContext(Context);

  const searchUser = async () => {
    const res = await getSearchUsers(searchName);
    setUserList(res.data.data);
  };
  const requestAddFriend = async (friendId: string) => {
    try {
      await sendFriendRequest(user.id, friendId);
    } catch (e) {
      console.error('Error in request:', e);
    }
  };
  return (
    <Modal isOpen={show} onClose={onClose}>
      <div>
        <h2 className="text-lg font-bold mb-4">Invite Friend</h2>
        <div className="flex justify-between items-center gap-4">
          <div className="grow">
            <Input
              name="userName"
              label="User Name"
              required
              type="text"
              placeholder="search name ..."
              onChange={(e) => setSearchName(e.target.value)}
              classNameLabel="text-base font-bold mb-1 mr-1"
              className="grow border border-slate-700 rounded-md px-2 py-0.5 font-medium tracking-wide outline-none "
            />
          </div>

          <div className="flex justify-center items-center  w-8 h-8">
            {' '}
            <Button
              icon="faCheck"
              type="button"
              styleType="secondary"
              disabled={searchName.length == 0}
              onClick={searchUser}
            />
          </div>
        </div>
        {userList && (
          <ul>
            {userList.map((user, index) => (
              <li className="flex justify-between" key={user.id}>
                <div className="grow"> {user.userName}</div>
                <div className="w-8 h-8">
                  {' '}
                  <Button
                    onClick={() => requestAddFriend(user.id)}
                    icon="faUserPlus"
                    styleType="secondary"
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  );
};

export default InviteFriend;
