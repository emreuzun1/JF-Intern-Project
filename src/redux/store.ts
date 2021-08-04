import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import createSagaMiddleware from '@redux-saga/core';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './sagas/index';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleWare = createSagaMiddleware();

const store = composeWithDevTools(applyMiddleware(sagaMiddleWare))(createStore)(persistedReducer);

let persistor = persistStore(store)

sagaMiddleWare.run(rootSaga);

export { store, persistor };
