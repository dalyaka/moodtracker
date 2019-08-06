import React from 'react';
import { useSelector } from 'react-redux';

import Day from '../shared/Day';

import { changeIndex } from '../../sagas/calendarSagas';
import {
  arraySelector,
  arrayChangedSelector,
} from '../../selectors/calendarSelectors';

export default function Home() {
  const array = useSelector(arraySelector);
  const changed = useSelector(arrayChangedSelector);

  return <Day changed={changed} changeIndex={changeIndex} array={array} />;
}
