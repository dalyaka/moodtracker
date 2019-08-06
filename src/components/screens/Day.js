import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Day from '../shared/Day';

import { changeIndex, changeDate } from '../../sagas/dateSagas';
import {
  arrayDateSelector,
  arrayChangedDateSelector,
} from '../../selectors/calendarSelectors';

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const date = navigation.getParam('date');

  useEffect(() => {
    if (date) {
      dispatch(changeDate(date));
    }
  }, [date]);

  const array = useSelector(arrayDateSelector);
  const changed = useSelector(arrayChangedDateSelector);

  return (
    <Day
      changed={changed}
      date={date}
      changeIndex={changeIndex}
      array={array}
    />
  );
}
