import reducer from '../reducer'
import { fromJS } from 'immutable';
import { logIn, logInSuccess, logInFailure } from '../actions'

const initialState = fromJS({
  errorMessage: '',
  loading: false,
});

describe('counter reducer', () => {
  
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  })

  it('should handle LOGIN', () => {
    expect(
      reducer(undefined, logIn())
    ).toEqual(initialState.set('loading', true));
    expect(
      reducer(initialState.set('loading', true), logIn())
    ).toEqual(initialState.set('loading', true));
    expect(
      reducer(initialState.set('errorMessage', 'An error occurred.'), logIn())
    ).toEqual(initialState.set('loading', true));
  })

  it('should handle LOGIN_SUCCESS', () => {
    expect(
      reducer(undefined, logInSuccess())
    ).toEqual(initialState.set('loading', false));
    expect(
      reducer(initialState.set('loading', true), logInSuccess())
    ).toEqual(initialState.set('loading', false));
  })

  it('should handle LOGIN_FAILURE', () => {
    expect(
      reducer(undefined, logInFailure('An error occurred.'))
    ).toEqual(initialState.set('errorMessage', 'An error occurred.'));
    expect(
      reducer(initialState.set('loading', true), logInFailure('An error occurred.'))
    ).toEqual(initialState
      .set('errorMessage', 'An error occurred.')
      .set('loading', false)
    );
  })
})