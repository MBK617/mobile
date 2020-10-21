import { increment, incrementAsyncSuccess } from "./actions";
import { call, put, takeLatest, all } from 'redux-saga/effects';

const delay = (ms) => new Promise(res => setTimeout(res, ms))

export function* incrementAsync() {
  yield call(delay, 1000)
  yield put(increment())
  yield put(incrementAsyncSuccess())
}

export default function* rootSaga() {
  yield all([
    takeLatest('INCREMENT_ASYNC', incrementAsync),
  ]);
}