import { createBottomTabNavigator } from 'react-navigation';

import Calendar from './Calendar';
import Home from './Home';
import User from './User';

export default createBottomTabNavigator(
  {
    Calendar: {
      screen: Calendar,
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
