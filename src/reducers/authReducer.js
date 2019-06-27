import { authActionTypes } from '../sagas/actionTypes';

const initialState = null;

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case authActionTypes.GET_COMPLETE:
    case authActionTypes.LOGIN_COMPLETE:
    case authActionTypes.SIGNUP_COMPLETE:
      return action.payload.user;
    case authActionTypes.GET_FAILED:
    case authActionTypes.LOGOUT_COMPLETE:
      return initialState;
    default:
      break;
  }
  return state;
}
