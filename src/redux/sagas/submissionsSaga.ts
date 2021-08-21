import {call, put, takeLatest} from 'redux-saga/effects';
import {
  getSubmissionsApi,
  editSubmissionApi,
  postNewSubmission,
} from '../../Lib/api';
import {IActionInterface} from '../../Interfaces/actionInterface';

import {
  FORM_SUBMISSION_REQUEST,
  FORM_SUBMISSION_SUCCESS,
  FORM_SUBMISSION_FAIL,
  FORM_SUBMISSIONPOST_REQUEST,
  NEW_SUBMISSION_POST,
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

function* editSubmission(action: IActionInterface) {
  try {
    const {apikey, id, qid, values, name} = action.payload;
    const {
      data: {responseCode},
    } = yield call(editSubmissionApi, apikey, id, qid, values, name);
    if (responseCode === 200) {
      console.log('SUCCESS!');
    }
  } catch (err) {}
}

function* postNewSubmissionSaga(action: IActionInterface) {
  try {
    const {apikey, id, data} = action.payload;
    yield call(postNewSubmission, apikey, id, data);
  } catch (err) {}
}

const submissionSaga = [
  takeLatest(FORM_SUBMISSION_REQUEST, getSubmissions),
  takeLatest(FORM_SUBMISSIONPOST_REQUEST, editSubmission),
  takeLatest(NEW_SUBMISSION_POST, postNewSubmissionSaga),
];

export default submissionSaga;
