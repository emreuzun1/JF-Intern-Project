import {call, put, takeLatest} from 'redux-saga/effects';
import {getSubmissionsApi, postSubmissionApi} from '../../Lib/api';
import {IActionInterface} from '../../Interfaces/actionInterface';

import {
  FORM_SUBMISSION_REQUEST,
  FORM_SUBMISSION_SUCCESS,
  FORM_SUBMISSION_FAIL,
  FORM_SUBMISSIONPOST_REQUEST,
} from '../actionTypes';

function* getSubmissions(action: IActionInterface) {
  try {
    const {apikey, id} = action.payload;
    const {
      data: {content, responseCode},
    } = yield call(getSubmissionsApi, apikey, id);
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

function* postSubmission(action: IActionInterface) {
  try {
    const {apikey, id} = action.payload;
    const {
      data: {responseCode},
    } = yield call(postSubmissionApi, apikey, id);
    if (responseCode === 200) {
      console.log('SUCCESS!');
    }
  } catch (err) {}
}

const submissionSaga = [
  takeLatest(FORM_SUBMISSION_REQUEST, getSubmissions),
  takeLatest(FORM_SUBMISSIONPOST_REQUEST, postSubmission),
];

export default submissionSaga;
