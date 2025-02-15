import {api} from '../api';

const getUserInfo = () => {
  return api.get(`/userInfo`);
};

const PutUserInfo = (data:any) =>{
  return api.put('/userInfo', data);
}

export {getUserInfo,PutUserInfo};
