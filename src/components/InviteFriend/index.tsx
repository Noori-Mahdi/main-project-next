'use client';

import {useState} from 'react';
import Button from '../Button';
import Input from '../Inpurt';
import Modal from '../Modal';
import {getSearchUsers} from '@/services/friends';

interface InviteFriendPropsType {
  show: boolean;
  onClose: () => void;
}

const InviteFriend = ({show, onClose}: InviteFriendPropsType) => {
  const [searchName, setSearchName] = useState('');
  const [userList, setUserList] = useState([]);

  const searchUser = async (string: string) => {
    const res = await getSearchUsers(string);
    setUserList(res.data);
  };
  console.log(userList, 'resresresres');

  return (
    <Modal isOpen={show} onClose={onClose}>
      <div>
        <h2 className="text-lg font-bold mb-4">Invite Friend</h2>
        <div className="flex justify-between items-center">
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

          <div className="flex justify-center items-center ml-4  w-6 h-6">
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
      </div>
    </Modal>
  );
};

export default InviteFriend;
