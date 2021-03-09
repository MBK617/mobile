import React, { useEffect } from 'react';
import { View, Text, Button , Image} from 'react-native';
import { compose } from 'redux';
import { createSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';

import Login from 'containers/Login';

import injectSaga from 'utils/redux/injectSaga';
import injectReducer from 'utils/redux/injectReducer';

import styles from './styles';
import reducer from './reducer';
import saga from './saga';
import { getToken, setToken } from './actions';

const selectApp = createSelector(
  state => state.app,
  substate => substate.toJS()
);

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(selectApp);

  useEffect(() => {
    dispatch(getToken());
  }, [])

  return (
    <View style={styles.root}>
      {token 
        ? <View>
            <Text>You are logged in!</Text>
            <Image style={styles.image} source = {{ uri: 'https://i.redd.it/tonbtar3mb741.jpg' }}/>
            <Button title='Log Out' onPress={()=>dispatch(setToken(null))}/>
          </View>
        : <Login/>
      }
    </View>
  );
}

const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });

export default compose(withReducer, withSaga)(App);