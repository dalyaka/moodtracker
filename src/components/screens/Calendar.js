import React, { Component } from 'react';
import { CalendarList } from 'react-native-calendars';

import { SafeAreaView, View } from 'react-native';

export default class Cal extends Component {
  render() {
    return (
      <SafeAreaView>
        <View>
          <CalendarList
            pastScrollRange={50}
            futureScrollRange={50}
            scrollEnabled
            showScrollIndicator={true}
          />
        </View>
      </SafeAreaView>
    );
  }
}
