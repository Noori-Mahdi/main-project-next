'use client';
import {UserInfo, UserListPropsType} from '@/types/type';
import Table from '../Table';
import {deleteUser, getAllUsers, getUser} from '@/services/user';
import {useEffect, useState} from 'react';
import {useToast} from '@/providers/ToastProvider';
import Modal from '../Modal';
import ImgBox from '../ImgBox';
import Input from '../Input';

const UserList = ({list}: UserListPropsType) => {
  const [itemList, setItemList] = useState<UserInfo[] | []>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>();
  const [firstLetter, setFirstLetter] = useState<null | string>(null);

  const {addToast} = useToast();

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      const res = await getAllUsers();
      setItemList(res.data.data);
      addToast('deleting user', 'success');
    } catch (error) {
      addToast('Error deleting user', 'error');
    }
  };

  const handleShow = async (id: string) => {
    try {
      setShowModal(true);
      const res = await getUser(id);
      setUserInfo(res.data.data);
      setFirstLetter(res.data.data.userName.trim().charAt(0));
      addToast(res.data.message, 'success');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'error';
      addToast(errorMessage, 'error');
    }
  };

  useEffect(() => {
    if (list && list.length > 0) {
      setItemList(list);
    } else {
      setItemList([]);
    }
  }, [list]);
  return (
    <>
      <div className="overflow-auto p-3 h-full w-full">
        <Table
          list={itemList}
          onDelete={(id) => {
            handleDelete(id);
          }}
          onShow={(id) => {
            handleShow(id);
          }}
        />
      </div>
      <Modal
        className=" w-16 mt-8 ml-3 border border-yellow-800 tracking-wide capitalize text-base font-medium rounded-sm bg-neutral-900"
        onClose={() => setShowModal(false)}
        isOpen={showModal}
      >
        {userInfo && (
          <div>
            <div className="w-10 h-10">
              {userInfo.image ? (
                <ImgBox
                  alt="user image"
                  imageWidth={30}
                  imageHeight={30}
                  image={userInfo.image}
                  classImageBox="flex justify-center items-center h-full w-full  rounded-full "
                  classImage="rounded-full w-full h-full"
                />
              ) : (
                <div
                  className="flex justify-center items-center text-white select-nonetext-xl 
              font-semibold uppercase bg-neutral-800 rounded-full w-full h-full"
                >
                  {firstLetter}
                </div>
              )}
            </div>
            <div className="mt-6">
              <Input
                label="user name"
                name="userName"
                type="text"
                icon="faUser"
                readOnly={true}
                disabled={true}
                defaultValue={userInfo.userName}
              />{' '}
            </div>
            <div className="mt-6">
              <Input
                label="user email"
                name="email"
                type="email"
                icon="faEnvelope"
                readOnly={true}
                disabled={true}
                defaultValue={userInfo.email}
              />
            </div>
            <div className="mt-6">
              <Input
                label="phone"
                name="phone"
                type="text"
                icon="faPhone"
                readOnly={true}
                disabled={true}
                defaultValue={userInfo.phone}
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default UserList;
