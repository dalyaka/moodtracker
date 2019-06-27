import { combineReducers } from 'redux';

import ui from './ui';
import user from './authReducer';

export default combineReducers({
  user,
  ui,
});
