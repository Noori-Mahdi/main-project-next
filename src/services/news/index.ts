import { api } from "../api";

const getNews = () => {
    return api.get('/news');
  };

export {getNews}