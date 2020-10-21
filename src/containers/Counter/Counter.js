import React from 'react'
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from 'reselect'

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';

import reducer from './reducer';
import saga from './saga';

import { increment, decrement, incrementAsync } from './actions'

import { StyleSheet, Button as ReactNativeButton, View, Text } from 'react-native';


const selectCounter = createSelector(
  state => state.counter,
  substate => substate.toJS()
)

const Button = (props) => (
  <View style={styles.button}>
    <ReactNativeButton {...props} />
  </View>
)

const Counter = () => {
  const dispatch = useDispatch();
  const { value, incrementingAsynchronously: isLoading } = useSelector(selectCounter)

  return (
    <View>
      <Text style={styles.counter}>
        {value}
      </Text>
      <Button 
        onPress={()=>dispatch(incrementAsync())}
        title={`Increment after 1 second ${isLoading ? '...' : ''}`}
        disabled={isLoading}
      />
      <Button 
        onPress={()=>dispatch(increment())}
        title='Increment'
      />
      <Button 
        onPress={()=>dispatch(decrement())}
        title='Decrement'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    margin: 12,
  },
  counter: {
    fontSize: 80,
    textAlign: 'center'
  }
});

const withReducer = injectReducer({ key: 'counter', reducer });
const withSaga = injectSaga({ key: 'counter', saga });

export default compose(withReducer, withSaga)(Counter);
