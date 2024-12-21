import { api } from "../api";

const getPages = () => {
    return api.get('/page');
  };

export {getPages}