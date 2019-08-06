import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';

import Swiper from 'react-native-swiper';
import { Text, StyleSheet, View } from 'react-native';

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

export default function Day({ changed, array, changeIndex }) {
  const dispatch = useDispatch();

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

Day.propTypes = {
  changed: PropTypes.bool.isRequired,
  array: PropTypes.arrayOf(PropTypes.string).isRequired,

  changeIndex: PropTypes.func.isRequired,
};
