import { AppRegistry } from 'react-native';
import './src/common/reactotron';

import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
