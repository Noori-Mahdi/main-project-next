import {api} from '../api';

const getFriends = (userId: string) => {
  return api.get(`/friends?userId=${userId}`);
};

const getSearchUsers = (searchString: string) => {
  return api.get(`/search?search=${searchString}`);
};

export {getFriends, getSearchUsers};
