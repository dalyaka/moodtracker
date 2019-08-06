import { combineReducers } from 'redux';

import ui from './ui';
import user from './authReducer';
import { calendarReducer, dateReducer } from './calendarReducer';

export default combineReducers({
  user,
  ui,
  calendar: calendarReducer,
  date: dateReducer,
});
