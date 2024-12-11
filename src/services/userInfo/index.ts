import { api } from "../api";

const getUserInfo = () => {
    return api.get('/userInfo');
  };

export {getUserInfo}