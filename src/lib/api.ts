import axios from './axios';

export function requestLogin(username: string, password: string) {
  return axios({
    method: 'POST',
    url: 'user/login',
    params: {
      username: username,
      password: password,
      access: 'full',
      appName: 'JFProje',
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

export function getForms() {
  return axios.get('/user/forms');
}

export function getSubmissionsApi(appKey: string, formId: string) {
  return axios.get(`/form/${formId}/submissions?apiKey=${appKey}`);
}

export function getQuestions(apikey: string, id: string) {
  return axios.get(`/form/${id}/questions?apiKey=${apikey}`);
}

export function getSubmission(apikey: string, id: string) {
  return axios.get(`/submission/${id}?apiKey=${apikey}`);
}

export function postSubmissionApi(apikey: string, id: string, data: any) {
  return axios({
    method: 'POST',
    url: `/submission/${id}?apiKey=${apikey}`,
    data,
  });
}
