import {api} from '../api';

const putChangePassword = (data: any) => {
  return api.put(`/changePassword`, data);
};

export {putChangePassword};
