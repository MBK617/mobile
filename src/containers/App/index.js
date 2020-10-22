import React from 'react';
import { View } from 'react-native';

import Counter from 'containers/Counter';

import styles from './styles';

function App() {
  return (
    <View style={styles.container}>
      <Counter/>
    </View>
  );
}

export default App;