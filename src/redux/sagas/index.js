import { all } from '@redux-saga/core/effects';
import auth from './authSaga';

export default function* rootSaga() {
    yield all([
        ...auth,
    ])
}