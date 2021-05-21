import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { fromJS } from 'immutable';

import { setToken } from 'containers/App/actions';

import ProfilePage from '..';

const initialState = {
  app: fromJS({
    token: '',
  })
};

describe('<ProfilePage />', () => {
  const sagaMiddleware = createSagaMiddleware();
  let store, rendered;
  
  const mockStore = (initialState) => ({ 
    ...configureStore([sagaMiddleware])(initialState), 
    injectedReducers: {}, 
    injectedSagas: {}, 
    runSaga: sagaMiddleware.run 
  });
  
  beforeEach(() => {
    store = mockStore(initialState);
    rendered = render(<Provider store={store}><ProfilePage /></Provider>);
  })

  afterEach(cleanup);

  it('should render correctly', () => {
    const tree = rendered.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('log out button should dispatch log out action', () => {
    fireEvent.press(rendered.getByText(/Log Out/i));
    const actions = store.getActions();
    expect(actions[0]).toEqual(setToken(null));
  });
});