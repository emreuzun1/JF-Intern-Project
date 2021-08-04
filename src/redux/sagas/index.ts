import { all } from '@redux-saga/core/effects';
import auth from './authSaga';
import form from './formSaga';
import submissions from './submissionSaga';

export default function* rootSaga() {
  yield all([
    ...auth, ...form, ...submissions
  ]);
}
