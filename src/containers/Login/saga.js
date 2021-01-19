import { logInSuccess } from "./actions";
import { put, takeLatest, all } from 'redux-saga/effects';
import { getRequestOptions, request } from "../../utils/request";

export function* makeLoginRequest(action) {
  const payload = {
    userEmail: action.email,
    userPassword: action.password
  }
  try {
    const result = yield request(`http://localhost:8080/api/public/user/login`, getRequestOptions('post', payload));
    yield put(logInSuccess(result.token));
  } catch (err) {
    //TODO: get error message and dispatch logInFailure
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest('LOGIN', makeLoginRequest),
  ]);
}