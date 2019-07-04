import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';

import Home from './Home';
import User from './User';
import Calendar from './Calendar';

const CalendarNavigator = createStackNavigator(
  {
    Calendar: {
      screen: Calendar,
    },
    Day: {
      screen: Home,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default createBottomTabNavigator(
  {
    Calendar: {
      screen: CalendarNavigator,
      navigationOptions: {
        tabBarLabel: 'Calendar',
      },
    },
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
      },
    },
    User: {
      screen: User,
      navigationOptions: {
        tabBarLabel: 'User',
      },
    },
  },
  {
    initialRouteName: 'Home',
  }
);
