import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';

import Swiper from 'react-native-swiper';
import { Text, StyleSheet, View } from 'react-native';

import { changeIndex } from '../../sagas/calendarSagas';
import {
  arraySelector,
  arrayChangedSelector,
} from '../../selectors/calendarSelectors';

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default function Home() {
  const dispatch = useDispatch();

  const array = useSelector(arraySelector);
  const changed = useSelector(arrayChangedSelector);

  return (
    <Swiper
      key={changed}
      showsPagination={false}
      showsButtons
      loop={false}
      onIndexChanged={index => dispatch(changeIndex(index))}
      index={10}
    >
      {array.map(day => {
        return (
          <View style={styles.slide} key={day}>
            <Text style={styles.text}>{format(new Date(day), 'DD MMMM')}</Text>
          </View>
        );
      })}
    </Swiper>
  );
}
