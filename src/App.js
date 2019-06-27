import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from './reducers/store';
import rootReducer from './reducers/root';
import sagas from './sagas';
import { initApp } from './sagas/common';

import AppNavigator from './components/navigator';

const store = configureStore(rootReducer, sagas);

store.dispatch(initApp());

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
