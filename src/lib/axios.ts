import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
const config: AxiosRequestConfig = {
  baseURL: 'https://api.jotform.com',
};
let instance: AxiosInstance = axios.create(config);

let apikey = '';

export const setAppKey = (_appKey: string) => {
  apikey = _appKey;
};

instance.interceptors.request.use(config => {
  config.params = {
    apikey,
    ...config.params,
  };
  return config;
});

export default instance;
