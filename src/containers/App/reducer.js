/*
 * AppReducer
 */

import { fromJS } from 'immutable';

export const initialState = fromJS({
  token: null,
}).set('history', ['home']);

function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_TOKEN_SUCCESS':
      return state.set('token', action.token);
    case 'SET_TOKEN_SUCCESS':
      return state.set('token', action.token);
    case 'PUSH_HISTORY':
      return state.set('history', [action.path, ...state.get('history')]);
    case 'POP_HISTORY':
      return state.set('history', state.get('history').slice(1));
    default:
      return state;
  }
}

export default appReducer;