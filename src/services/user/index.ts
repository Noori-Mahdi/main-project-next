import {api} from '../api';

const getAllUsers = () => {
  return api.get('/users');
};

const getUser = (id:string) =>{
  return api.get(`/users/${id}`);
}

const deleteUser = (id: string) => {
  return api.delete(`/users/${id}`);
};

export {getAllUsers, deleteUser, getUser};
