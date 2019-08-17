import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';

import Swiper from 'react-native-swiper';
import { StyleSheet, View, Text } from 'react-native';

import MoodSelector from './MoodSelector/MoodSelector';

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#9DD6EB',
    backgroundColor: '#fff',
  },
  text: {
    // color: '#fff',
    color: '#9DD6EB',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
  },
});

export default function Day({ changed, array, changeIndex }) {
  const dispatch = useDispatch();

  const [angle, setAngle] = useState(0);

  const set = useCallback(a => {
    if (a <= Math.PI * 1.5) {
      setAngle(a);
    }
  }, []);

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
            {/* <Text style={styles.text}>{angleLength}</Text> */}
            <Text style={styles.text}>{format(new Date(day), 'DD MMMM')}</Text>
            <MoodSelector
              angle={angle}
              onUpdate={set}
              strokeWidth={40}
              radius={125}
              colorFrom="#ff9800"
              colorTo="#ffcf00"
              bgColor="#171717"
            />
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
