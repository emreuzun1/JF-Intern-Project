import { call, put, takeLatest } from 'redux-saga/effects';
import { getForms } from '../../lib/api';
import { IActionInterface } from '../../interfaces/actionInterface';

import {
  USER_FORMS_REQUEST, USER_FORMS_SUCCESS, USER_FORMS_FAIL,
} from '../actionTypes';

function* getForm(action: IActionInterface) {
  try {
    const { data: { content, responseCode } } = yield call(getForms);
    if (responseCode === 200) {
      yield put({ type: USER_FORMS_SUCCESS, payload: content.filter((item: any) => item.status === "ENABLED") });
    } else {
      yield put({ type: USER_FORMS_FAIL });
    }
  } catch (err) {
    console.log(err);
  }
}


const formSaga = [takeLatest(USER_FORMS_REQUEST, getForm)];

export default formSaga;
