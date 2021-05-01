import reducer from '../reducer'
import { fromJS } from 'immutable';
import { getTokenSuccess, popHistory, pushHistory, setTokenSuccess } from '../actions'

const initialState = fromJS({
  token: null,
}).set('history', ['home']);;

describe('counter reducer', () => {
  
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  })

  it('should handle GET_TOKEN_SUCCESS', () => {
    expect(
      reducer(undefined, getTokenSuccess('token!!!'))
    ).toEqual(initialState.set('token', 'token!!!'));
    expect(
      reducer(initialState.set('token', 'token!!!'), getTokenSuccess('aDifferentToken'))
    ).toEqual(initialState.set('token', 'aDifferentToken'));
    expect(
      reducer(initialState.set('token', 'token!!!'), getTokenSuccess(null))
    ).toEqual(initialState.set('token', null));
  })

  it('should handle SET_TOKEN_SUCCESS', () => {
    expect(
      reducer(undefined, setTokenSuccess('token!!!'))
    ).toEqual(initialState.set('token', 'token!!!'));
    expect(
      reducer(undefined, setTokenSuccess('aDifferentToken'))
    ).toEqual(initialState.set('token', 'aDifferentToken'));
    expect(
      reducer(undefined, setTokenSuccess(null))
    ).toEqual(initialState.set('token', null));
  })

  it('should handle PUSH_HISTORY', () => {
    expect(
      reducer(undefined, pushHistory('inbox'))
    ).toEqual(initialState.set('history', ['inbox', 'home']));
    expect(
      reducer(initialState.set('history', ['inbox', 'home']), pushHistory('home'))
    ).toEqual(initialState.set('history', ['home', 'inbox', 'home']));
  })

  it('should handle POP_HISTORY', () => {
    expect(
      reducer(undefined, popHistory())
    ).toEqual(initialState.set('history', []));
    expect(
      reducer(initialState.set('history', ['inbox', 'home']), popHistory())
    ).toEqual(initialState);
  })
})