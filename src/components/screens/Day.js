import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, SafeAreaView } from 'react-native';

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
    <SafeAreaView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Button title="< Назад" onPress={() => navigation.navigate('Calendar')} />
      <Day
        changed={changed}
        date={date}
        changeIndex={changeIndex}
        array={array}
      />
    </SafeAreaView>
  );
}
