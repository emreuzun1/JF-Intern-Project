import { all } from '@redux-saga/core/effects';
import auth from './authSaga';
import form from './formSaga';
import submissions from './submissionSaga';
import questions from './questionsSaga';

export default function* rootSaga() {
  yield all([
    ...auth, ...form, ...submissions, ...questions
  ]);
}
