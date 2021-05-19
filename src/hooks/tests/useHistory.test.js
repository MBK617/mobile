import { useMemo } from 'react';
import { popHistory, pushHistory } from 'containers/App/actions';
import useHistory from '../useHistory'

const mockDispatch = jest.fn();
jest.mock('react-redux', () =>( {
  useSelector: () => ({ history: ['home', 'more'] }),
  useDispatch: () => mockDispatch
}));

jest.mock('react');
useMemo.mockImplementation((func) => func());

describe('useHistory hook', () => {

  it('should return object with correct fields', () => {
    const {
      history,
      path,
      goTo,
      goBack
    } = useHistory();

    expect(history).toBeInstanceOf(Array);
    expect(typeof path).toBe('string');
    expect(goTo).toBeInstanceOf(Function);
    expect(goBack).toBeInstanceOf(Function);
  });

  it('should dispatch pushHistory action on goTo', () => {
    const {
      goTo
    } = useHistory();

    goTo('test');
    expect(mockDispatch).toHaveBeenCalledWith(pushHistory('test'))
  });

  it('should dispatch popHistory action on goBack', () => {
    const {
      goBack
    } = useHistory();

    goBack();
    expect(mockDispatch).toHaveBeenCalledWith(popHistory())
  });
});