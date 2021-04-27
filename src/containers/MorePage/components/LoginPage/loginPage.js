import React, { useState } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import { Button, Text, View } from 'react-native';

import injectSaga from 'utils/redux/injectSaga';
import injectReducer from 'utils/redux/injectReducer';
import Input from 'components/Input';

import styles from './styles';
import reducer from './reducer';
import saga from './saga';
import { logIn } from './actions';

const selectLogin = createSelector(
  state => state.login,
  substate => substate.toJS()
);

const Login = () => {
  const dispatch = useDispatch();
  const { errorMessage } = useSelector(selectLogin);

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  return (
    <View style={styles.root}>
      <Input value={email} onChangeText={setEmail} placeholder="Email"/>
      <Input value={password} onChangeText={setPassword} placeholder="Password"/>
      <Text style={styles.error}>{errorMessage}</Text>
      <Button title="Log In" onPress={()=>dispatch(logIn(email, password))}/>
    </View>
  );
}

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

export default compose(withReducer, withSaga)(Login);
