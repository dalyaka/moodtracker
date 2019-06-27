import { combineReducers } from 'redux';

import ui from './ui';
import auth from './authReducer';

export default combineReducers({
  auth,
  ui,
});
