import { combineReducers } from 'redux';
import { authActionTypes } from '../sagas/actionTypes';

import { requestUiStateReducer } from '../common/requestState';

export default combineReducers({
  auth: requestUiStateReducer(authActionTypes.GET),
  login: requestUiStateReducer(authActionTypes.LOGIN),
  signup: requestUiStateReducer(authActionTypes.SIGNUP),
});
