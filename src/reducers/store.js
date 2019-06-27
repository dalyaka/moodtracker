import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

// import { composeWithDevTools } from 'remote-redux-devtools';
// import Reactotron from 'reactotron-react-native';

export default function configureStore(rootReducer, rootSaga) {
  const opts = __DEV__
    ? undefined // { sagaMonitor: Reactotron.createSagaMonitor() }
    : undefined;

  const sagaMiddleware = createSagaMiddleware(opts);

  const enhacners = [];
  const middlwares = [sagaMiddleware];

  // if (__DEV__) {
  //   enhacners.push(
  //     composeWithDevTools(
  //       applyMiddleware(...middlwares),
  //       Reactotron.createEnhancer()
  //     )
  //   );
  // } else {
  enhacners.push(applyMiddleware(...middlwares));
  // }

  const store = createStore(rootReducer, compose(...enhacners));

  sagaMiddleware.run(rootSaga);

  return store;
}
