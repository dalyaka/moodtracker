import { call, put } from 'redux-saga/effects';
// import { normalize } from 'normalizr';
import { appActionTypes } from './actionTypes';

export const initApp = () => ({
  type: appActionTypes.INIT,
  payload: {},
});

export function* handleAsyncCall({ type, payload, asyncCall, meta }) {
  if (asyncCall) {
    try {
      const result = yield call(asyncCall, payload);
      // if (meta && meta.schema) {
      //   result = normalize(result, meta.schema);
      // }
      yield put({ type: `${type}_COMPLETE`, payload: result, meta });
    } catch (error) {
      yield put({ type: `${type}_FAILED`, payload: error, meta });
    }
  }
}
