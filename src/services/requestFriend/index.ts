import {api} from '../api';

const sendFriendRequest = (senderId: string, receiverId: string) => {
  return api.post('/requestFriend', {senderId, receiverId});
};
const putFriendRequest = (requestId: number, isAccepted: boolean) => {
  return api.put('/requestFriend', {requestId, isAccepted});
};
const getFriendRequest = (userId: string) => {
  return api.get(`/requestFriend?receiverId=${userId}`);
};

export {sendFriendRequest, getFriendRequest, putFriendRequest};
