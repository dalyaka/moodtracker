import { createSelector } from 'reselect';

export const calendarState = state => state.calendar;
export const dateState = state => state.date;

export const arraySelector = createSelector(
  calendarState,
  calendar => calendar.array
);

export const arrayChangedSelector = createSelector(
  calendarState,
  calendar => calendar.changed
);

export const arrayDateSelector = createSelector(
  dateState,
  calendar => calendar.array
);

export const arrayChangedDateSelector = createSelector(
  dateState,
  calendar => calendar.changed
);
