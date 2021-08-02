import { call, put, takeLatest } from 'redux-saga/effects';
import { getForms } from '../../lib/api';
import {
  USER_FORMS_REQUEST, USER_FORMS_SUCCESS, USER_FORMS_FAIL
} from '../actionTypes';

function* getData(action) {
  console.log(action);

  try {
    const { apikey } = action.payload;
    const { data } = yield call(getForms, apikey);
    if (data.responseCode === 200) {
      yield put({ type: USER_FORMS_SUCCESS, payload: data });
    } else {
      yield put({ type: USER_FORMS_FAIL });
    }
  } catch (err) {
    console.log(err);
  }
}

const formSaga = [takeLatest(USER_FORMS_REQUEST, getData)];

export default formSaga;
