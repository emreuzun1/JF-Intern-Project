import { call, put, takeLatest } from 'redux-saga/effects';
import { requestLogin } from '../../lib/api';
import { USER_LOGIN_REQUEST, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_LOGIN_RESTOREAPPKEY } from '../actionTypes';
import { IActionInterface } from '../../interfaces/actionInterface';
import { setAppKey } from '../../lib/axios';

function* loginWithUsername(action: IActionInterface) {
  try {
    const { email, password } = action.payload;
    const { data: { content, responseCode } } = yield call(requestLogin, email, password);
    if (responseCode === 200) {
      yield put({ type: USER_LOGIN_SUCCESS, payload: content });
      setAppKey(content.appKey);
    } else {
      yield put({ type: USER_LOGIN_FAIL });
    }
  } catch (err) {
    yield put({ type: USER_LOGIN_FAIL });
  }
}

const authSaga = [
  takeLatest(USER_LOGIN_REQUEST, loginWithUsername),
];

export default authSaga;
