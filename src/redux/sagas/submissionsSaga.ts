import {call, put, takeLatest} from 'redux-saga/effects';
import {getSubmissionsApi} from '../../Lib/api';
import {IActionInterface} from '../../Interfaces/actionInterface';

import {
  FORM_SUBMISSION_REQUEST,
  FORM_SUBMISSION_SUCCESS,
  FORM_SUBMISSION_FAIL,
} from '../actionTypes';

function* getSubmissions(action: IActionInterface) {
  try {
    const {apikey, id} = action.payload;
    const {
      data: {content, responseCode, trying},
    } = yield call(getSubmissionsApi, apikey, id);
    console.log(trying);
    if (responseCode === 200) {
      yield put({
        type: FORM_SUBMISSION_SUCCESS,
        payload: content.filter((item: any) => item.status === 'ACTIVE'),
      });
    } else {
      yield put({type: FORM_SUBMISSION_FAIL});
    }
  } catch (err) {}
}

const submissionSaga = [takeLatest(FORM_SUBMISSION_REQUEST, getSubmissions)];

export default submissionSaga;
