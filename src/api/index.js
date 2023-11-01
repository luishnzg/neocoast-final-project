import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://fakestoreapi.com/',
});

/* export default axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
      api_key: 'c8fa1303782767db4c31e557878020fb',
    },
  }); */

export default instance;
