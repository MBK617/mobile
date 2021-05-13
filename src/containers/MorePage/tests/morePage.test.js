import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup } from '@testing-library/react-native';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { fromJS } from 'immutable';
import useHistory from 'hooks/useHistory';

import MorePage from '..';

jest.mock('hooks/useHistory');
useHistory.mockImplementation(() => ({
  history: ['home'],
  path: 'home'
}));

const initialState = {
  app: fromJS({
    token: '',
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
  
  beforeEach(() => {
    store = mockStore(initialState);
    rendered = render(<Provider store={store}><MorePage /></Provider>);
  })

  afterEach(cleanup);

  it('should render correctly', () => {
    const tree = rendered.toJSON();
    expect(tree).toMatchSnapshot();
  });
});