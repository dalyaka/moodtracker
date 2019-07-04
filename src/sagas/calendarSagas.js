import { calendarActionTypes } from './actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const changeIndex = index => ({
  type: calendarActionTypes.CHANGE_INDEX,
  payload: { index },
});
