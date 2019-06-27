import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';

import authorized from './shared/authorized';

import Splash from './screens/auth/SplashScreen';
import Login from './screens/auth/LoginScreen';
import Signup from './screens/auth/SignupScreen';

import Root from './screens/Root';

const AuthRoot = createStackNavigator(
  {
    Splash,
    Login,
    Signup,
  },
  {
    initialRouteName: 'Splash',
    defaultNavigationOptions: {
      headerTransparent: true,
    },
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthRoot,
      Main: authorized(Root),
    },
    {
      initialRouteName: 'AuthRoot',
    }
  )
);
