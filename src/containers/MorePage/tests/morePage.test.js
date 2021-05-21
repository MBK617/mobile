import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup } from '@testing-library/react-native';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { fromJS } from 'immutable';

import useHistory from 'hooks/useHistory';
import useLoginStatus from 'hooks/useLoginStatus';

import MorePage from '..';

jest.mock('hooks/useHistory');

jest.mock('hooks/useLoginStatus');

const initialState = {
  app: fromJS({
    token: ''
  }),
  login:  fromJS({
    errorMessage: '',
    loading: false
  })
};

describe('<MorePage />', () => {
  const sagaMiddleware = createSagaMiddleware();
  let store, rendered;

  const mockStore = (initialState) => ({ 
    ...configureStore([sagaMiddleware])(initialState), 
    injectedReducers: {}, 
    injectedSagas: {}, 
    runSaga: sagaMiddleware.run 
  });

  describe('logged out navigation menu', () => {
    beforeEach(() => {
      store = mockStore(initialState);
      useLoginStatus.mockImplementation(() => false);
      useHistory.mockImplementation(() => ({
        history: ['more', 'home'],
        path: 'more'
      }));    
      rendered = render(<Provider store={store}><MorePage /></Provider>);
    })
  
    afterEach(cleanup);
  
    it('should render without crashing', () => {
      const tree = rendered.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('login page', () => {
    beforeEach(() => {
      store = mockStore(initialState);
      useLoginStatus.mockImplementation(() => false);
      useHistory.mockImplementation(() => ({
        history: ['more/login', 'more', 'home'],
        path: 'more/login'
      }));    
      rendered = render(<Provider store={store}><MorePage /></Provider>);
    })
  
    afterEach(cleanup);
  
    it('should render without crashing', () => {
      const tree = rendered.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  
  describe('settings page', () => {
    beforeEach(() => {
      store = mockStore(initialState);
      useLoginStatus.mockImplementation(() => true);
      useHistory.mockImplementation(() => ({
        history: ['more/settings', 'more', 'home'],
        path: 'more/settings'
      }));    
      rendered = render(<Provider store={store}><MorePage /></Provider>);
    })
  
    afterEach(cleanup);
  
    it('should render without crashing', () => {
      const tree = rendered.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  
});

