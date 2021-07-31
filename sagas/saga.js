import { takeLatest } from "@redux-saga/core/effects";
import { handleGetUser } from "./handler/user";
import { GET_USER } from '../reducers/user';

export function* watcherSaga() {
    yield takeLatest(GET_USER, handleGetUser)
};