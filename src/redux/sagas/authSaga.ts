import { call, put, takeLatest } from 'redux-saga/effects';
import { requestLogin, requestLogout } from '../../Lib/api';
import { USER_LOGIN_REQUEST, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_LOGOUT_FAIL } from '../actionTypes';
import { IActionLoginInterface, IActionLogout } from '../../Interfaces/actionInterface';
import { setAppKey } from '../../Lib/axios';

function* loginWithUsername(action: IActionLoginInterface) {
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
    yield put({ type: USER_LOGIN_FAIL, error: err.message });
  }
}

function* logOut(action: IActionLogout) {
  try {
    const { data: { responseCode } } = yield call(requestLogout);
    if (responseCode === 200) {
      yield put({ type: USER_LOGOUT_SUCCESS });
    } else {
      yield put({ type: USER_LOGOUT_FAIL });
    }
  } catch (err) {

  }
}

const authSaga = [
  takeLatest(USER_LOGIN_REQUEST, loginWithUsername),
  takeLatest(USER_LOGOUT_REQUEST, logOut),
];

export default authSaga;
