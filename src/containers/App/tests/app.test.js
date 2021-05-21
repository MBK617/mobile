import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, cleanup, act } from '@testing-library/react-native';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import useHistory from 'hooks/useHistory';
import useLoginStatus from 'hooks/useLoginStatus';

import App from '..';

jest.mock('@expo/vector-icons');

jest.mock('hooks/useHistory');

jest.mock('hooks/useLoginStatus');

const initialState = {
  app: fromJS({
    token: null,
  }).set('history', ['home'])
};

describe('<App />', () => {
  const sagaMiddleware = createSagaMiddleware();
  let store, rendered;

  const mockStore = (initialState) => ({ 
    ...configureStore([sagaMiddleware])(initialState), 
    injectedReducers: {}, 
    injectedSagas: {}, 
    runSaga: sagaMiddleware.run 
  });

  let goTo, goBack;

  describe('when logged in to home page', () => {
    beforeEach(() => {
      store = mockStore(initialState);
      goTo = jest.fn();
      goBack = jest.fn();
      useHistory.mockImplementation(() => ({
        history: ['home'],
        path: 'home',
        goTo,
        goBack
      }));
      useLoginStatus.mockImplementation(() => true);
      rendered = render(
        <Provider store={store}>
          <App />
        </Provider>
      );
    })
  
    afterEach(cleanup);
  
    it('should render without crashing', () => {
      const tree = rendered.toJSON();
      expect(tree).toMatchSnapshot();
    });
  
    it('should display back button', () => {
      expect(rendered.getByLabelText(/Back/i)).toBeTruthy();
    });
  
    it('should disable back button without prior navigation', () => {
      const backButton = rendered.getByLabelText(/Back/i);
      expect(backButton.props.accessibilityState.disabled).toBeTruthy();
    });
    
    it('should call goBack on back click, provided prior navigation', () => {
      const inboxButton = rendered.getByLabelText(/Inbox/i);
      act(inboxButton.props.onClick);
      expect(goTo).toHaveBeenCalledWith('inbox')
      const backButton = rendered.getByLabelText(/Back/i);
      act(backButton.props.onClick);
      expect(goBack).toHaveBeenCalled();
    });
  
    it('should render bottom navigation when logged out', () => {
      useLoginStatus.mockImplementation(() =>  false);
      rendered = render(
        <Provider store={store}>
          <App />
        </Provider>
      );
      
      const buttons = rendered.queryAllByRole('button').slice(2);
      expect(buttons.map(b => b.props.accessibilityLabel)).toEqual(['Home', 'More']);
    })
  
    it('should render bottom navigation when logged in', () => {
      const buttons = rendered.queryAllByRole('button').slice(2);
      expect(buttons.map(b => b.props.accessibilityLabel)).toEqual(['Home', 'Events', 'Inbox', 'More']);
    })
  
    it('should navigate on bottom navigation clicks', () => {
      const buttons = rendered.queryAllByRole('button').slice(2);
      buttons.forEach(button => {
        act(button.props.onClick);
        expect(goTo).toHaveBeenCalledWith(button.props.accessibilityLabel.toLowerCase());
      })
    });
  });

  describe('events', () => {
    beforeEach(() => {
      store = mockStore(initialState);
      useLoginStatus.mockImplementation(() => true);
      useHistory.mockImplementation(() => ({
        history: ['events', 'home'],
        path: 'events',
        goTo,
        goBack
      }));
      rendered = render(
        <Provider store={store}>
          <App />
        </Provider>
      );
    });
  
    afterEach(cleanup);
  
    it('should render without crashing', () => {
      const tree = rendered.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('inbox', () => {
    beforeEach(() => {
      store = mockStore(initialState);
      useLoginStatus.mockImplementation(() => true);
      useHistory.mockImplementation(() => ({
        history: ['inbox', 'home'],
        path: 'inbox',
        goTo,
        goBack
      }));
      rendered = render(
        <Provider store={store}>
          <App />
        </Provider>
      );
    });
  
    afterEach(cleanup);
  
    it('should render without crashing', () => {
      const tree = rendered.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('more', () => {
    beforeEach(() => {
      store = mockStore(initialState);
      useLoginStatus.mockImplementation(() => true);
      useHistory.mockImplementation(() => ({
        history: ['more', 'home'],
        path: 'more',
        goTo,
        goBack
      }));
      rendered = render(
        <Provider store={store}>
          <App />
        </Provider>
      );
    });
  
    afterEach(cleanup);
  
    it('should render without crashing', () => {
      const tree = rendered.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});