import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { popHistory, pushHistory } from 'containers/App/actions';

const selectApp = createSelector(
  state => state.app,
  substate => substate.toJS()
);

const useHistory = () => {
  const { history } = useSelector(selectApp);
  const dispatch = useDispatch();

  const path = useMemo(() => {
    return history.length > 0 ? history[0] : '';
  }, [history]);

  const goTo = (value) => {
    let newPath = value;
    if(newPath.substr(0, 2) === './') {
      newPath = `${path}/${newPath}`
    }
    if(path !== newPath) {
      dispatch(pushHistory(newPath));
    }
  }

  const goBack = () => {
    if(history.length > 1) {
      dispatch(popHistory());
    }
  }

  return {
    history,
    path,
    goTo,
    goBack
  };
}

export default useHistory;