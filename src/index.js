/**
 * @module Main
 */

import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';

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
      <ReduxProvider store={store}>
        <PaperProvider>
          <App/>
        </PaperProvider>
      </ReduxProvider>
  );
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(Root);
