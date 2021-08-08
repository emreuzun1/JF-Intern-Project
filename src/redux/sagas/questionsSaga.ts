import { call, put, takeLatest } from 'redux-saga/effects';
import { getQuestions } from '../../lib/api';
import { IActionInterface } from '../../interfaces/actionInterface';

import { FORM_QUESTIONS_REQUEST, FORM_QUESTIONS_SUCCESS, FORM_QUESTIONS_FAIL } from '../actionTypes';

function* getFormQuestions(action: IActionInterface) {
    try {
        const { apikey, id } = action.payload;
        const { data: { content, responseCode } } = yield call(getQuestions, apikey, id);
        if (responseCode === 200) {
            yield put({ type: FORM_QUESTIONS_SUCCESS, payload: content });
        }
    } catch (err) {
        console.log(err);
    }
};

const questionsSaga = [takeLatest(FORM_QUESTIONS_REQUEST, getFormQuestions)];

export default questionsSaga;