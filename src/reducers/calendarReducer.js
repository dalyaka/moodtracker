import { format, addDays } from 'date-fns';
import { calendarActionTypes } from '../sagas/actionTypes';

const DATE_FORMAT = 'YYYY-MM-DD';
const today = format(new Date(), 'YYYY-MM-DD');
const HALF_DAYS = 9;

const range = size => [...new Array(size).keys()];
const getArray = day => {
  return [
    ...range(10).map((_, i) => format(addDays(day, -10 + i), DATE_FORMAT)),
    day,
    ...range(10).map((_, i) => format(addDays(day, 1 + i), DATE_FORMAT)),
  ];
};

const initialState = {
  day: today,
  array: getArray(today),
  changed: false,
};

export default function calendarReducer(state = initialState, action) {
  switch (action.type) {
    case calendarActionTypes.CHANGE_INDEX: {
      const { index } = action.payload;
      const { day, changed } = state;
      if (index === 1 || index === 19) {
        const addedDays = index === 1 ? -HALF_DAYS : HALF_DAYS;
        return {
          array: getArray(format(addDays(day, addedDays), 'YYYY-MM-DD')),
          day: format(addDays(day, addedDays), 'YYYY-MM-DD'),
          changed: !changed,
        };
      }

      return state;
    }
    default:
      break;
  }
  return state;
}
