import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { getToken } from 'containers/App/actions';

const selectApp = createSelector(
  state => state.app,
  substate => substate.toJS()
);

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