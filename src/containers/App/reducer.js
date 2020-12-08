/*
 * AppReducer
 */

import { fromJS } from 'immutable';

export const initialState = fromJS({
  // app state
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default appReducer;