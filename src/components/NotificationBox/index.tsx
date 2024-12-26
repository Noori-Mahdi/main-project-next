import {UserInfo} from '@/types/type';
import DynamicIcon from '../DynamicIcon';
import Button from '../Button';
import {putFriendRequest} from '@/services/requestFriend';
import {useContext} from 'react';
import {Context} from '@/providers/MainContext';

interface NotificationBoxPropsType {
  notification: {
    type: 'friendRequest';
    data: {id: string; sender: UserInfo}[];
  };
  isOpen: boolean;
  onClose: () => void;
  onReload: () => void;
}

const NotificationBox = ({
  notification,
  isOpen,
  onReload,
  onClose,
}: NotificationBoxPropsType) => {
  const {updateUserInfo, user} = useContext(Context);
  const handleConfirmRequest = async (id: string, e: boolean) => {
    try {
      await putFriendRequest(id, e);
      if (e) await updateUserInfo();
      onReload;
    } catch (error) {}
  };

  console.log(user, 'tesestrsatsr');

  if (!isOpen) return null;

  return (
    <>
      {notification.type == 'friendRequest' && (
        <div className="absolute w-52 h-72 top-5 right-5 bg-slate-700 rounded-md">
          <div className="flex justify-between items-center p-2 py-1 border-b">
            <div className="text-base font-medium capitalize">
              <span>mail</span>
              <span className="ml-1" onClick={onReload}>
                <DynamicIcon
                  className="cursor-pointer"
                  iconName="faRotateRight"
                />
              </span>
            </div>
            <DynamicIcon
              className=" cursor-pointer hover:text-red-500"
              iconName="faXmark"
              onClick={onClose}
            />
          </div>
          {notification.data.length > 0 && notification.data && (
            <ul>
              {notification.data.map((notif, index) => (
                <li key={index} className="flex justify-between items-center">
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
                        onClick={() => handleConfirmRequest(notif.id, false)}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default NotificationBox;
