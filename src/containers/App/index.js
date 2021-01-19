import React from 'react';
import { View } from 'react-native';

import styles from './styles';
import Login from 'containers/Login';

function App() {
  return (
    <View style={styles.container}>
      <Login/>
    </View>
  );
}

export default App;