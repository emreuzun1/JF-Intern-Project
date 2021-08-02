import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.jotform.com',
  timeout: 1000,
});

export default instance;
