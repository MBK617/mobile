import { all, takeLatest, put } from "redux-saga/effects";
import * as storage from 'utils/storage';
import { getTokenSuccess, setTokenSuccess } from "./actions";

export function* setTokenInStorage(action) {
  try {
    if(action.token) {
      yield storage.setItem('token', action.token);
    } else {
      yield storage.deleteItem('token');
    }
    yield put(setTokenSuccess(action.token));
  } catch (err) {
    console.error(err);
  }
}

export function* getTokenFromStorage() {
  try {
    const value = yield storage.getItem('token');
    if(value !== null) {
      yield put(getTokenSuccess(value));
    }
  } catch(err) {
    console.error(err);
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest('SET_TOKEN', setTokenInStorage),
    takeLatest('GET_TOKEN', getTokenFromStorage),
  ]);
}