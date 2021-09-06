import {call, put, takeLatest} from 'redux-saga/effects';
import {requestLogin, requestLogout, requestRegister} from '../../lib/api';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_REGISTER_REQUEST,
} from '../actionTypes';
import {
  IActionInterface,
  IActionLoginInterface,
} from '../../Interfaces/actionInterface';
import {setAppKey} from '../../lib/axios';
import * as RootNavigation from '../../Navigation/RootNavigation';
import Toast from 'react-native-toast-message';

function* loginWithUsername(action: IActionLoginInterface) {
  try {
    const {email, password} = action.payload;
    const {
      data: {content, responseCode},
    } = yield call(requestLogin, email, password);
    if (responseCode === 200) {
      yield put({type: USER_LOGIN_SUCCESS, payload: content});
      RootNavigation.navigate('Form', {});
      setAppKey(content.appKey);
      Toast.show({
        type: 'success',
        text1: 'SUCCESS!',
        text2: 'Logged in',
        position: 'bottom',
        visibilityTime: 1000,
      });
    } else {
      yield put({type: USER_LOGIN_FAIL});
    }
  } catch (err) {
    if (err.message.indexOf('401') > -1) {
      Toast.show({
        type: 'error',
        text1: 'Wrong!',
        text2: 'Username or password is wrong!',
        position: 'bottom',
        visibilityTime: 2000,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Failed!',
        text2: 'Login failed',
        position: 'bottom',
        visibilityTime: 2000,
      });
    }
    yield put({type: USER_LOGIN_FAIL, error: err.message});
  }
}

function* logOut() {
  try {
    const {
      data: {responseCode},
    } = yield call(requestLogout);
    if (responseCode === 200) {
      yield put({type: USER_LOGOUT_SUCCESS});
    } else {
      yield put({type: USER_LOGOUT_FAIL});
    }
  } catch (err) {
    yield put({type: USER_LOGOUT_FAIL});
  }
}

function* signUp(action: IActionInterface) {
  try {
    const {username, password, email} = action.payload;
    const {
      data: {responseCode},
    } = yield call(requestRegister, username, email, password);
    if (responseCode === 200) {
      RootNavigation.navigate('Login', {isLogged: false});
    }
  } catch (err) {
    console.log(err);
  }
}

const authSaga = [
  takeLatest(USER_LOGIN_REQUEST, loginWithUsername),
  takeLatest(USER_LOGOUT_REQUEST, logOut),
  takeLatest(USER_REGISTER_REQUEST, signUp),
];

export default authSaga;
