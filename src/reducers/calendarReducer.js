import { format, addDays, differenceInCalendarDays } from 'date-fns';
import { calendarActionTypes, dateActionTypes } from '../sagas/actionTypes';

const DATE_FORMAT = 'YYYY-MM-DD';
const today = format(new Date(), DATE_FORMAT);
const HALF_DAYS = 9;

const differenceInDays = date => {
  return differenceInCalendarDays(new Date(today), new Date(date));
};

const range = size => (size ? [...new Array(size).keys()] : []);

const getArray = day => {
  const difference = differenceInDays(day);

  return [
    ...range(10).map((_, i) => format(addDays(day, -10 + i), DATE_FORMAT)),
    day,
    ...range(difference < 10 ? difference : 10).map((_, i) =>
      format(addDays(day, 1 + i), DATE_FORMAT)
    ),
  ];
};

const initialState = {
  day: today,
  array: getArray(today),
  changed: false,
};

export const makeCalendarReducer = (indexAction, dateAction) => (
  state = initialState,
  action
) => {
  switch (action.type) {
    case indexAction: {
      const { index } = action.payload;
      const { day, changed, array } = state;
      if (
        (index === 1 || index === state.array.length - 1) &&
        array[index] !== today
      ) {
        const addedDays = index === 1 ? -HALF_DAYS : HALF_DAYS;
        return {
          array: getArray(format(addDays(day, addedDays), DATE_FORMAT)),
          day: format(addDays(day, addedDays), DATE_FORMAT),
          changed: !changed,
        };
      }
      return state;
    }
    case dateAction: {
      const date = format(new Date(action.payload.date), DATE_FORMAT);
      return {
        day: date,
        array: getArray(date),
        changed: false,
      };
    }

    default:
      break;
  }
  return state;
};

export const calendarReducer = makeCalendarReducer(
  calendarActionTypes.CHANGE_INDEX,
  calendarActionTypes.CHANGE_DATE
);

export const dateReducer = makeCalendarReducer(
  dateActionTypes.CHANGE_INDEX,
  dateActionTypes.CHANGE_DATE
);
