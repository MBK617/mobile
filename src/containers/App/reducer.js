/*
 * AppReducer
 */

import { fromJS } from 'immutable';

export const initialState = fromJS({
  token: null
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_TOKEN_SUCCESS':
      return state.set('token', action.token);
    case 'SET_TOKEN_SUCCESS':
      return state.set('token', action.token);
    default:
      return state;
  }
}

export default appReducer;