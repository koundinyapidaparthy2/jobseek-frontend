import { call, put, takeLatest } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
  googleAuthRequest,
  googleAuthSuccess,
  googleAuthFailure,
  refreshTokenSuccess,
  refreshTokenFailure,
} from "../slices/authSlice";
import {
  loginApi,
  signupApi,
  googleAuthApi,
  refreshTokenApi,
} from "../../api/authApi";

function* handleLogin(action) {
  try {
    const data = yield call(loginApi, action.payload);
    yield put(loginSuccess(data));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

function* handleSignup(action) {
  try {
    const data = yield call(signupApi, action.payload);
    yield put(signupSuccess(data));
  } catch (error) {
    yield put(signupFailure(error.message));
  }
}

function* handleGoogleAuth(action) {
  try {
    const data = yield call(googleAuthApi, action.payload);
    yield put(googleAuthSuccess(data));
  } catch (error) {
    yield put(googleAuthFailure(error.message));
  }
}

function* handleRefreshToken(action) {
  try {
    const data = yield call(refreshTokenApi, action.payload);
    yield put(refreshTokenSuccess(data));
  } catch (error) {
    yield put(refreshTokenFailure(error.message));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(signupRequest.type, handleSignup);
  yield takeLatest(googleAuthRequest.type, handleGoogleAuth);
  // Optionally: yield takeLatest("auth/refreshTokenRequest", handleRefreshToken);
}
