
jest.mock('react-redux');    

import { useEffect } from 'react';
import useLoginStatus from '../useLoginStatus';
import { getToken } from 'containers/App/actions';
import reactRedux from 'react-redux';

jest.mock('react');
useEffect.mockImplementation((func) => func());

jest.mock('react-redux', () => jest.fn());

describe('useLoginStatus hook', () => {
  let mockDispatch;
  describe('token is present', () => {
    beforeEach(() => {
      mockDispatch = jest.fn();
      reactRedux.useDispatch = () => mockDispatch;
      reactRedux.useSelector = () => ({ token: 'token' })
    });

    it('should return boolean', () => {
      const isLoggedIn = useLoginStatus();
      expect(isLoggedIn).toEqual(true);
    });

    it('should not dispatch getToken action', () => {
      useLoginStatus();
      expect(mockDispatch).not.toHaveBeenCalled();
    });
  })

  describe('token is not present', () => {
    beforeEach(() => {
      mockDispatch = jest.fn();
      reactRedux.useSelector = () => ({ token: null })
      reactRedux.useDispatch = () => mockDispatch;
    });

    it('should return boolean', () => {
      const isLoggedIn = useLoginStatus();
      expect(isLoggedIn).toEqual(false);
    });

    it('should not dispatch getToken action', () => {
      useLoginStatus();
      expect(mockDispatch).toHaveBeenCalledWith(getToken());
    });
  })
});