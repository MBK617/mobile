import reducer from '../reducer'
import { fromJS } from 'immutable';
import { decrement, increment, incrementAsync, incrementAsyncSuccess } from '../actions'


const initialState = fromJS({
  value : 0,
  incrementingAsynchronously: false
});

describe('counter reducer', () => {
  
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle INCREMENT', () => {
    expect(
      reducer(undefined, increment())
    ).toEqual(initialState.set('value', 1))
    expect(
      reducer(initialState.set('value', 2), increment())
    ).toEqual(initialState.set('value', 3));
    expect(
      reducer(initialState.set('value', -1), increment())
    ).toEqual(initialState.set('value', 0));
  })

  it('should handle DECREMENT', () => {
    expect(
      reducer(undefined, decrement())
    ).toEqual(initialState.set('value', -1));
    expect(
      reducer(initialState.set('value', 1), decrement())
    ).toEqual(initialState.set('value', 0));

    expect(
      reducer(initialState.set('value', -1), decrement())
    ).toEqual(initialState.set('value', -2));
  })

  it('should handle INCREMENT_ASYNC', () => {
    expect(
      reducer(undefined, incrementAsync())
    ).toEqual(initialState.set('incrementingAsynchronously', true));
    expect(
      reducer(initialState.set('incrementingAsynchronously', true), incrementAsync())
    ).toEqual(initialState.set('incrementingAsynchronously', true));
  })

  it('should handle INCREMENT_ASYNC_SUCCESS', () => {
    expect(
      reducer(undefined, incrementAsyncSuccess())
    ).toEqual(initialState);
    expect(
      reducer(initialState.set('incrementingAsynchronously', true), incrementAsyncSuccess())
    ).toEqual(initialState);
  })
})