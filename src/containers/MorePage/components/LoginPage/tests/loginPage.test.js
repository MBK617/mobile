import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, cleanup, fireEvent } from '@testing-library/react-native';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';

import { setToken } from 'containers/App/actions';
import { logIn, logInFailure, logInSuccess } from '../actions';

import LoginPage from '..';


jest.mock('utils/request', () => ({
  request: (url, options) => {
    if(options.userPassword === "bad_password") throw Error("Could not log in.")
    return {
      token: 'token'
    }
  },
  getRequestOptions: (type, payload) => payload
}));

const initialState = {
  login: fromJS({
    errorMessage: '',
    loading: false,
  })
};

describe('<LoginPage />', () => {
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
      <Provider store={store}><LoginPage /></Provider>
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
  
  it('should disable button without input', () => {
    const button = rendered.getByText(/Log In/i);
    fireEvent(button, 'press');
    const actions = store.getActions();
    expect(actions).toHaveLength(0)
  });

  it('should dispatch login action, then loginSuccess', () => {
    fireEvent.changeText(rendered.getByPlaceholderText(/Email/i), "email@email.com");
    fireEvent.changeText(rendered.getByPlaceholderText(/Password/i), "password");
    fireEvent.press(rendered.getByText(/Log In/i));
    const actions = store.getActions();
    expect(actions[0]).toEqual(logIn("email@email.com", "password"));
    expect(actions[1]).toEqual(setToken('token'));
    expect(actions[2]).toEqual(logInSuccess());
  });

  it('should dispatch login action, then loginFailure', () => {
    fireEvent.changeText(rendered.getByPlaceholderText(/Email/i), "email@email.com");
    fireEvent.changeText(rendered.getByPlaceholderText(/Password/i), "bad_password");
    fireEvent.press(rendered.getByText(/Log In/i));
    const actions = store.getActions();
    expect(actions[0]).toEqual(logIn("email@email.com", "bad_password"));
    expect(actions[1]).toEqual(logInFailure("Could not log in."));
  });

  it('should render error message', () => {
    store = mockStore({ login: initialState.login.set('errorMessage', 'An error occurred') });
    rendered = render(
      <Provider store={store}><LoginPage /></Provider>
    );
    expect(rendered.getByText('An error occurred')).toBeTruthy();
  });
});