import { dateActionTypes } from './actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const changeIndex = index => ({
  type: dateActionTypes.CHANGE_INDEX,
  payload: { index },
});

export const changeDate = date => ({
  type: dateActionTypes.CHANGE_DATE,
  payload: { date },
});
