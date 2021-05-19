import { useMemo } from 'react';
import reactRedux from 'react-redux';

import { popHistory, pushHistory } from 'containers/App/actions';
import useHistory from '../useHistory'


jest.mock('react-redux', () => jest.fn());

jest.mock('react');
useMemo.mockImplementation((func) => func());

describe('useHistory hook', () => {
  let mockDispatch = jest.fn();
  beforeEach(() => {
    mockDispatch = jest.fn();
    reactRedux.useDispatch = () => mockDispatch;
  })

  describe('normal history', () => {
    beforeEach(() => {
      reactRedux.useSelector = () => ({ history: ['home', 'more'] })
    });

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
  
    it('should dispatch pushHistory action with relative path on goTo', () => {
      const {
        goTo
      } = useHistory();
  
      goTo('./test');
      expect(mockDispatch).toHaveBeenCalledWith(pushHistory('home/test'))
    });
  
    it('should not dispatch pushHistory action if navigating to current path', () => {
      const {
        goTo
      } = useHistory();
  
      goTo('home');
      expect(mockDispatch).not.toHaveBeenCalled();
    });
  
    it('should dispatch popHistory action on goBack', () => {
      const {
        goBack
      } = useHistory();
  
      goBack();
      expect(mockDispatch).toHaveBeenCalledWith(popHistory())
    });
  });


  describe('empty history', () => {
    beforeEach(() => {
      reactRedux.useSelector = () => ({ history: [] })
    });

    it('should not error and should have empty string for path', () => {
      const {
        path
      } = useHistory();
      expect(path).toBe('')
    });
  });

  describe('history length 1', () => {
    beforeEach(() => {
      reactRedux.useSelector = () => ({ history: ['home'] })
    });

    it('should not dispatch popHistory action on goBack', () => {
      const {
        goBack
      } = useHistory();
      goBack();
      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });

});