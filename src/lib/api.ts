import axios from './axios';
import {QuestionInterface} from '../Interfaces/QuestionInterface';
import {FormType} from '../Interfaces/FormsInterface';
import {SubmissionAnswerInterface} from '../Interfaces/SubmissionAnswerInterface';

export function requestLogin(username: string, password: string) {
  return axios({
    method: 'POST',
    url: 'user/login',
    params: {
      username: username,
      password: password,
      access: 'full',
      appName: 'JFTable',
    },
  });
}

export function requestLogout() {
  return axios({
    method: 'GET',
    url: '/v1/user/logout',
  });
}

export function requestRegister(
  username: string,
  email: string,
  password: string,
) {
  return axios({
    method: 'POST',
    url: 'user/register',
    params: {
      username: username,
      password: password,
      email: email,
    },
  });
}

export const getForms = () => {
  return axios.get<FormType>('/user/forms');
};

export function getSubmissionsApi(appKey: string, formId: string) {
  return axios.get(`/form/${formId}/submissions?apiKey=${appKey}`);
}

export function getQuestions(apikey: string, id: string) {
  return axios.get<QuestionInterface[]>(
    `/form/${id}/questions?apiKey=${apikey}`,
  );
}

export function getSubmission(apikey: string, id: string) {
  return axios.get(`/submission/${id}?apiKey=${apikey}`);
}

export function editSubmissionApi(
  apikey: string,
  id: string,
  qid: number,
  values: any,
  name?: boolean,
) {
  let formData = new FormData();

  if (name) {
    Object.keys(values).map(key => {
      formData.append(`submission[${qid}][${key}]`, values[key]);
    });
  } else {
    formData.append(`submission[${qid}]`, values);
  }

  return axios({
    method: 'POST',
    url: `/submission/${id}?apiKey=${apikey}`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function postNewSubmission(
  apikey: string,
  id: string,
  data: Map<number, SubmissionAnswerInterface>,
) {
  let formData = new FormData();
  Array.from(data.keys()).forEach(key => {
    formData.append(`submission[${key}]`, data.get(key));
  });
  /*
  return axios({
    method: 'POST',
    url: `/form/${id}/submissions?apiKey=${apikey}`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });*/
}
