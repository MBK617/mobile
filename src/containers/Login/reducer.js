import { fromJS } from 'immutable';

const initialState = fromJS({
  errorMessage: '',
  token: null,
  loading: false,
});

export default function counter(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return state.set('loading', true);
    case 'LOGIN_SUCCESS': 
      return state
        .set('token', action.token)
        .set('loading', false);
    case 'LOGIN_FAILURE':
      return state
        .set('errorMessage', 'No saga implemented')
        .set('loading', false);
    default:
      return state
  }
}
