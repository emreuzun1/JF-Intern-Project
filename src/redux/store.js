import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import createSagaMiddleware from '@redux-saga/core';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './sagas/index';

const sagaMiddleWare = createSagaMiddleware();

const store = composeWithDevTools(
    applyMiddleware(sagaMiddleWare),
)(createStore)(rootReducer);

sagaMiddleWare.run(rootSaga);

export default store;