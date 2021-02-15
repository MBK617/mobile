import { fromJS } from 'immutable';

const initialState = fromJS({
  errorMessage: '',
  loading: false,
});

export default function counter(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return state
        .set('loading', true)
        .set('errorMessage', '');
    case 'LOGIN_SUCCESS': 
      return state
        .set('loading', false);
    case 'LOGIN_FAILURE':
      return state
        .set('errorMessage', action.error)
        .set('loading', false);
    default:
      return state
  }
}
