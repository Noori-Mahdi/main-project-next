'use client';
import {UserInfo} from '@/types/type';
import DynamicIcon from '../DynamicIcon';
import Button from '../Button';
import {putFriendRequest} from '@/services/requestFriend';
import {useContext, useState} from 'react';
import {Context} from '@/providers/MainContext';
import Badge from '../badge';

interface NotificationBoxPropsType {
  notification: {
    data: {id: string; sender: UserInfo}[];
  };
  isOpen?: boolean;
}

const NotificationBox = ({notification}: NotificationBoxPropsType[]) => {
  const [show, setShow] = useState(false);

  const handleConfirmRequest = async (id: string, e: boolean) => {
    try {
      await putFriendRequest(id, e);
    } catch (error) {
      console.log('Error :', error);
    }
  };

  return (
    <>
      {notification.type == 'friendRequest' && (
        <div className="relative flex justify-center items-center">
          <DynamicIcon
            className="mr-4 text-base cursor-pointer"
            iconName="faEnvelope"
            onClick={() => {
              setShow(true);
            }}
          />
          <div className="absolute left-0 bottom-0 translate-x-1/2 rounded-full w-4 h-4 translate-y-1/2 bg-slate-700">
            <Badge count={notification.length} />
          </div>
          {show && (
            <div className="absolute w-52 h-72 top-5 right-5 bg-slate-700 rounded-md">
              <div className="flex justify-between items-center p-2 py-1 border-b">
                <div className="text-base font-medium capitalize">
                  <span>mail</span>
                </div>
                <DynamicIcon
                  className=" cursor-pointer hover:text-red-500"
                  iconName="faXmark"
                  onClick={() => {
                    setShow(false);
                  }}
                />
              </div>
              {notification.data.length > 0 && notification.data && (
                <ul>
                  {notification.data.map((notif, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div className="grow">{notif.sender.userName}</div>
                      <div className="flex">
                        <div>
                          <Button
                            className="w-8 h-8"
                            styleType="secondary"
                            icon="faCheck"
                            onClick={() => handleConfirmRequest(notif.id, true)}
                          />
                        </div>
                        <div>
                          <Button
                            className="w-8 h-8"
                            styleType="secondary"
                            icon="faXmark"
                            onClick={() =>
                              handleConfirmRequest(notif.id, false)
                            }
                          />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default NotificationBox;
