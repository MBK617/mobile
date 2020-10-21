import { registerRootComponent } from 'expo';

import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './configureStore'
import App from './containers/App';

const initialState = {}
const store = configureStore(initialState)

function Root() {
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  );
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(Root);
