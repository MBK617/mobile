import { fromJS } from 'immutable';

const initialState = fromJS({
  value : 0,
  incrementingAsynchronously: false
});

export default function counter(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state.set('value', state.get('value') + 1)
    case 'DECREMENT':
      return state.set('value', state.get('value') - 1)
    case 'INCREMENT_ASYNC':
      return state.set('incrementingAsynchronously', true)
    case 'INCREMENT_ASYNC_SUCCESS':
      return state.set('incrementingAsynchronously', false)
    default:
      return state
  }
}
