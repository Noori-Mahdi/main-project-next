import {api} from '../api';

const getAllProduct = () => {
  return api.get('/Product');
};

const addProduct = (data: FormData) => {
  return api.post('/Product', data, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
};

const deleteProduct = (id: string) => {
  return api.delete(`/Product/${id}`);
};

const editProduct = (id: string, data: FormData) => {
  return api.put(`/Product/${id}`, data, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
};

export {getAllProduct, addProduct, deleteProduct, editProduct};
