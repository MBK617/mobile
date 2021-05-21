import React from 'react';
import { View, Text, Image, Button } from "react-native";
import { useDispatch } from 'react-redux';

import { setToken } from 'containers/App/actions';

import styles from './styles';

const ProfilePage = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.root}>
      <Text>You are logged in!</Text>
      <Image style={styles.image} source = {{ uri: 'https://i.redd.it/tonbtar3mb741.jpg' }}/>
      <Button title='Log Out' onPress={()=>dispatch(setToken(null))}/>
    </View>
  );
}

export default ProfilePage;