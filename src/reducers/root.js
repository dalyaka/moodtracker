import { combineReducers } from 'redux';

import ui from './ui';
import user from './authReducer';
import calendar from './calendarReducer';

export default combineReducers({
  user,
  ui,
  calendar,
});
