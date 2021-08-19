import {call, put, takeLatest} from 'redux-saga/effects';
import {requestLogin, requestLogout, requestRegister} from '../../Lib/api';
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
import {setAppKey} from '../../Lib/axios';
import * as RootNavigation from '../../Navigation/RootNavigation';
import {ToastAndroid} from 'react-native';

function* loginWithUsername(action: IActionLoginInterface) {
  try {
    const {email, password} = action.payload;
    const {
      data: {content, responseCode, valid},
    } = yield call(requestLogin, email, password);
    console.log(valid);
    if (responseCode === 200) {
      yield put({type: USER_LOGIN_SUCCESS, payload: content});
      RootNavigation.navigate('Form', {});
      setAppKey(content.appKey);
    } else {
      yield put({type: USER_LOGIN_FAIL});
    }
  } catch (err) {
    if (err.message.indexOf('401') > -1) {
      ToastAndroid.show('Username or password incorrect!', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Login failed!', ToastAndroid.SHORT);
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
  } catch (err) {}
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
