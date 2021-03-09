import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, cleanup, fireEvent } from '@testing-library/react-native';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';

import Login from '..';

const initialState = {
  login: fromJS({
    errorMessage: '',
    loading: false,
  })
};

describe('<Login />', () => {
  const sagaMiddleware = createSagaMiddleware();
  let store, rendered;

  const mockStore = (initialState) => ({ 
    ...configureStore([sagaMiddleware])(initialState), 
    injectedReducers: {}, 
    injectedSagas: {}, 
    runSaga: sagaMiddleware.run 
  });

  beforeEach( () => {
    store = mockStore(initialState);
    rendered = render(
      <Provider store={store}><Login /></Provider>
    );
  })

  afterEach(cleanup);

  it('should render correctly', () => {
    const tree = rendered.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should display login form', () => {
    expect(rendered.getByPlaceholderText(/Email/i)).toBeTruthy();
    expect(rendered.getByPlaceholderText(/Password/i)).toBeTruthy();
    expect(rendered.getByText(/Log In/i)).toBeTruthy();
  });
  
  it('should dispatch login action', () => {
    const button = rendered.getByText(/Log In/i);
    fireEvent(button, 'press');
    const actions = store.getActions();
    expect(actions[0].type).toEqual('LOGIN');
  });

  it('should render error message', () => {
    store = mockStore({ login: initialState.login.set('errorMessage', 'An error occurred') });
    rendered = render(
      <Provider store={store}><Login /></Provider>
    );
    expect(rendered.getByText('An error occurred')).toBeTruthy();
  });
});