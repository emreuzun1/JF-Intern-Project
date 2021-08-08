import { ILoginResponseType } from '../interfaces/apiResponseType';
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

export function getForms() {
  return axios({
    method: 'GET',
    url: '/user/forms',
  });
}

export function getSubmissionsApi(appKey: string, formId: string) {
  return axios({
    method: 'GET',
    url: `/form/${formId}/submissions?apiKey=${appKey}`,
  })
}

export function getQuestions(apikey: string, id: string) {
  return axios({
    method: 'GET',
    url: `/form/${id}/questions?apiKey=${apikey}`,
  })
}