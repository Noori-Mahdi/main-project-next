import { api } from "../api";

const getPages = () => {
    return api.get('/pages');
  };

export {getPages}