import { call, put, takeLatest } from 'redux-saga/effects';
import { requestLogin } from '../../lib/api';
import { USER_LOGIN_REQUEST, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS } from '../actionTypes';

function* login(action) {
    try {
        const { email, password } = action.payload;
        const { data: { content, responseCode } } = yield call(requestLogin, email, password);
        if (responseCode == 200) {
            yield put({ type: USER_LOGIN_SUCCESS, payload: content });
        }
        else {
            yield put({ type: USER_LOGIN_FAIL });
        }
    } catch (err) {
        console.log("saga error", err);
        yield put({ type: USER_LOGIN_FAIL });
    }
}

const authSaga = [
    takeLatest(USER_LOGIN_REQUEST, login),
];

export default authSaga;