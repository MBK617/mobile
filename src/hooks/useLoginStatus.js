import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getToken } from 'containers/App/actions';
import { selectApp } from 'containers/App/selectors';

const useLoginStatus = () => {
  const { token } = useSelector(selectApp);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!token) {
      dispatch(getToken());
    }
  }, []);

  return !!token;
}

export default useLoginStatus;