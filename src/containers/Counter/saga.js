import { increment, incrementAsyncSuccess } from "./actions";
import { delay, put, takeLatest, all } from 'redux-saga/effects';

export function* incrementAsyncSaga() {
  yield delay(1000)
  yield put(increment())
  yield put(incrementAsyncSuccess())
}

export default function* rootSaga() {
  yield all([
    takeLatest('INCREMENT_ASYNC', incrementAsyncSaga),
  ]);
}