import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CalendarList } from 'react-native-calendars';

import { format } from 'date-fns';

import { SafeAreaView, View } from 'react-native';

export default class Cal extends Component {
  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
  };

  render() {
    const { navigation } = this.props;

    return (
      <SafeAreaView>
        <View>
          <CalendarList
            pastScrollRange={50}
            futureScrollRange={50}
            scrollEnabled
            showScrollIndicator
            onDayPress={day => {
              navigation.navigate('Day', { date: day.dateString });
            }}
            maxDate={format(new Date(), 'YYYY-MM-DD')}
            hideExtraDays
          />
        </View>
      </SafeAreaView>
    );
  }
}
