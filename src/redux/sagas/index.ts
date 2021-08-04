import { all } from '@redux-saga/core/effects';
import auth from './authSaga';
import form from './formSaga';
import submission from './submissionSaga';

export default function* rootSaga() {
  yield all([
    ...auth, ...form, ...submission
  ]);
}
