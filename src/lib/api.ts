import {ILoginResponseType} from '../interfaces/apiResponseType';
import axios from './axios';

//TODO axios.post, JSON to TS
export function requestLogin(username: string, password: string) {
  return axios({
    method: 'POST',
    url: '/user/login',
    params: {
      username: username,
      password: password,
      access: 'full',
      appName: 'JFTable',
    },
  });
}
