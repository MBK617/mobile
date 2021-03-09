import { put, takeLatest, all, call } from 'redux-saga/effects';
import { getRequestOptions, request } from "utils/request";
import { setToken } from "containers/App/actions";
import { logInSuccess, logInFailure } from "./actions";

export function* makeLoginRequest(action) {
  const payload = {
    userEmail: action.email,
    userPassword: action.password
  }
  try {
    const result = yield call(request, `/api/public/user/login`, getRequestOptions('post', payload));
    yield put(setToken(result.token));
    yield put(logInSuccess());
  } catch (err) {
    yield put(logInFailure(err.message));
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest('LOGIN', makeLoginRequest),
  ]);
}