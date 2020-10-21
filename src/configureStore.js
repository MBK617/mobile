import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import createReducer from './reducers';

export default function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    createReducer(),
    initialState,
    applyMiddleware(sagaMiddleware)
  );

  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {};
  store.injectedSagas = {};

  return store;
}
