import UserList from '@/components/UserList';
import {getAllUsers} from '@/services/user';

const usersManagement = async () => {
  const users = await getAllUsers();

  return (
    <div className="rounded-lg h-full w-full">
      <UserList list={users.data.data} />
    </div>
  );
};

export default usersManagement;
