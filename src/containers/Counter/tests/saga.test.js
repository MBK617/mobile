import { incrementAsyncSaga } from '../saga'
import { put, delay } from 'redux-saga/effects';
import { increment, incrementAsyncSuccess } from '../actions'

describe('counter saga', () => {
  it('incrementAsyncSaga should wait one second before incrementing', () => {
    const gen = incrementAsyncSaga();
    expect(gen.next().value).toEqual(delay(1000));
    expect(gen.next().value).toEqual(put(increment()));
    expect(gen.next().value).toEqual(put(incrementAsyncSuccess()));
    expect(gen.next().done).toBe(true);
  });
})