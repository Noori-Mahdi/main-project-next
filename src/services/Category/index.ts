import { api } from "../api";

const getCategory = () => {
    return api.get('/Category');
  };

export {getCategory}