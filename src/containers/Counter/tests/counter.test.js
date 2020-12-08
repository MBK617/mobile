import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, cleanup, fireEvent } from '@testing-library/react-native';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';


import Counter from '../counter';


const initialState = {
  counter: fromJS({
    value : 0,
    incrementingAsynchronously: false
  })
};



describe('<Counter />', () => {
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
      <Provider store={store}><Counter /></Provider>
    );
  })

  afterEach(cleanup);

  it('should render correctly', () => {
    const tree = rendered.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should display current count', () => {
    const textComponent = rendered.getByText('0');
    expect(textComponent.props.children).toEqual(0);
  });
  
  it('should dispatch increment action', () => {
    const buttonComponent = rendered.getByText('Increment');
    fireEvent(buttonComponent, 'press');
    const actions = store.getActions();
    expect(actions.length).toBe(1);
    expect(actions[0].type).toEqual('INCREMENT');
  });

  it('should dispatch decrement action', () => {
    const buttonComponent = rendered.getByText('Decrement');
    fireEvent(buttonComponent, 'press');
    const actions = store.getActions();
    expect(actions.length).toBe(1);
    expect(actions[0].type).toEqual('DECREMENT');
  });

  it('should dispatch increment async action', () => {
    const buttonComponent = rendered.getByText('Increment after 1 second ');
    fireEvent(buttonComponent, 'press');
    const actions = store.getActions();
    expect(actions.length).toBe(1);
    expect(actions[0].type).toEqual('INCREMENT_ASYNC');
  });

});