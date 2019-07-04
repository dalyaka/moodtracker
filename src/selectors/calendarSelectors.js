import { createSelector } from 'reselect';

export const calendarState = state => state.calendar;

export const arraySelector = createSelector(
  calendarState,
  calendar => calendar.array
);

export const arrayChangedSelector = createSelector(
  calendarState,
  calendar => calendar.changed
);
