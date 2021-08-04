import { call, put, takeLatest } from 'redux-saga/effects';
import { getSubmissionsApi } from '../../lib/api';
import { IActionInterface } from '../../interfaces/actionInterface';

import { FORM_SUBMISSION_REQUEST, FORM_SUBMISSION_SUCCESS, FORM_SUBMISSION_FAIL } from '../actionTypes';

function* getSubmissions(action: IActionInterface) {
    try {
        const { apikey, id } = action.payload;
        const { data: { content, responseCode } } = yield call(getSubmissionsApi, apikey, id);
        if (responseCode === 200) {
            yield put({ type: FORM_SUBMISSION_SUCCESS, payload: content });
        } else {
            yield put({ type: FORM_SUBMISSION_FAIL });
        }
    } catch (err) {
        console.log(err);
    }
}

const submissionSaga = [takeLatest(FORM_SUBMISSION_REQUEST, getSubmissions)];

export default submissionSaga;