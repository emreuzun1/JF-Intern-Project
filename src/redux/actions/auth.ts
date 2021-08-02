import * as type from '../actionTypes';

export function requestLogin(email: string, password: string) {
  return {
    type: type.USER_LOGIN_REQUEST,
    payload: {
      email,
      password,
    },
  };
}
