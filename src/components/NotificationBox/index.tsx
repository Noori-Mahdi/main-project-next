'use client';
import {RequestFriendNotifType} from '@/types/type';
import DynamicIcon from '../DynamicIcon';
import Button from '../Button';
import {putFriendRequest} from '@/services/requestFriend';
import {useState} from 'react';
import Badge from '../badge';

interface NotificationBoxPropsType {
  notifList: RequestFriendNotifType[];
  userName: string;
}

const NotificationBox = ({notifList, userName}: NotificationBoxPropsType) => {
  const [show, setShow] = useState(false);

  const handleConfirmRequest = async (id: number, e: boolean) => {
    try {
      await putFriendRequest(id, e);
    } catch (error) {
      console.log('Error :', error);
    }
  };

  return (
    <>
      <div className="relative flex justify-center items-center">
        <DynamicIcon
          className="mr-4 text-base cursor-pointer"
          iconName="faEnvelope"
          onClick={() => {
            setShow(!show);
          }}
        />
        {notifList.length > 0 && (
          <div
            onClick={() => {
              setShow(!show);
            }}
            className="absolute select-none cursor-pointer left-0 bottom-0 translate-x-1/2 rounded-full w-4 h-4 translate-y-1/2 bg-slate-700"
          >
            <Badge count={notifList.length} />
          </div>
        )}

        <div
          className={`absolute w-52 h-72 top-5 right-5 bg-slate-700 rounded-md transition-all duration-300 transform ${
            show
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <div className="flex justify-between items-center p-2 py-1 border-b">
            <div className="text-base font-medium capitalize">
              <span>mail</span>
            </div>
            <DynamicIcon
              className="cursor-pointer hover:text-red-500"
              iconName="faXmark"
              onClick={() => {
                setShow(false);
              }}
            />
          </div>
          {notifList.length > 0 && (
            <ul>
              {notifList.map((notif) => (
                <li
                  key={notif.id} // استفاده از notif.id به عنوان مقدار یکتا برای key
                  className="flex justify-between items-center"
                >
                  {notif.sender.userName !== 'systeam' ? (
                    <>
                      <div className="grow">{notif.sender.userName}</div>
                      <div className="flex">
                        <Button
                          className="w-8 h-8"
                          styleType="secondary"
                          icon="faCheck"
                          onClick={() => handleConfirmRequest(notif.id, true)}
                        />
                        <Button
                          className="w-8 h-8"
                          styleType="secondary"
                          icon="faXmark"
                          onClick={() => handleConfirmRequest(notif.id, false)}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <div>{notif.sender.title}</div>
                        <div>{notif.sender.userName}</div>
                      </div>
                      <div>{notif.sender.content}</div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationBox;
