import { all } from '@redux-saga/core/effects';
import auth from './authSaga';
import form from './formSaga';

export default function* rootSaga() {
  yield all([
    ...auth, ...form
  ]);
}
