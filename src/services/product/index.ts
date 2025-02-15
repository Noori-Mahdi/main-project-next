import {api} from '../api';

const getAllProduct = () => {
  return api.get('/Product');
};

const addProduct = (data: FormData) => {
  return api.post('/Product', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export {getAllProduct, addProduct};
