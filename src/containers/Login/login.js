import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import injectSaga from 'utils/redux/injectSaga';
import injectReducer from 'utils/redux/injectReducer';

import styles from './styles';
import reducer from './reducer';
import saga from './saga';
import { Button, Text, TextInput, View } from 'react-native';
import { logIn } from './actions';

const selectLogin = createSelector(
  state => state.login,
  substate => substate.toJS()
);

const Input = (props) => {
  return (
    <View style={styles.input}>
      <TextInput {...props} />
    </View>
  )
}

const Login = () => {
  const dispatch = useDispatch();
  const { errorMessage } = useSelector(selectLogin);

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  return (
    <View style={styles.root}>
      <Input value={email} onChangeText={setEmail}/>
      <Input value={password} onChangeText={setPassword}/>
      <Button title="Log In" onPress={()=>dispatch(logIn(email, password))}/>
      <Text>{errorMessage}</Text>
    </View>
  );
}

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

export default compose(withReducer, withSaga)(Login);
