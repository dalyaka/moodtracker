import { takeEvery, put, select, call } from 'redux-saga/effects';
import { authActionTypes, appActionTypes } from './actionTypes';

import { handleAsyncCall } from './common';

import { authApi } from '../api/AuthApi';

import { userSelector } from '../selectors/auth';
import { tokenStorage } from '../common/TokenStorage';

export const getCurrentUser = () => ({
  type: authActionTypes.GET,
  payload: {},
  asyncCall: authApi.getCurrentUser,
});

export const loginUser = (login, password) => ({
  type: authActionTypes.LOGIN,
  payload: { login, password },
  asyncCall: authApi.login,
});

export const signupUser = form => ({
  type: authActionTypes.SIGNUP,
  payload: form,
  asyncCall: authApi.signup,
});

export const logoutUser = () => ({
  type: authActionTypes.LOGOUT,
  payload: null,
  asyncCall: authApi.logout,
});

function* handleAppInit() {
  const user = yield select(userSelector);
  if (!user) {
    yield call(tokenStorage.restore);
    yield put(getCurrentUser());
  }
}

function* handleAuthCall({ type, payload, asyncCall }) {
  try {
    const result = yield call(asyncCall, payload);
    yield call(tokenStorage.set, result.token);
    yield put({ type: `${type}_COMPLETE`, payload: result });
  } catch (error) {
    yield put({ type: `${type}_FAILED`, payload: error });
  }
}

export function* authSagas() {
  yield takeEvery(
    [authActionTypes.GET, authActionTypes.LOGOUT],
    handleAsyncCall
  );

  yield takeEvery(
    [authActionTypes.LOGIN, authActionTypes.SIGNUP],
    handleAuthCall
  );

  yield takeEvery(authActionTypes.LOGOUT_COMPLETE, function* cleartoken() {
    yield call(tokenStorage.remove);
  });

  yield takeEvery(appActionTypes.INIT, handleAppInit);

  yield takeEvery(authActionTypes.GET_FAILED, function* cleartoken({
    payload,
  }) {
    if (payload && payload.httpStatus > 400 && payload.httpStatus < 500) {
      yield call(tokenStorage.remove);
    }
  });
}
