/**
 * @module Main
 */

import React from 'react';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';

import App from 'containers/App';

import configureStore from './configureStore'


const initialState = {}
const store = configureStore(initialState)

/**
 * Entry point for application
 *
 * @returns {Component} Wrapped application entry point 
 * 
 */
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
