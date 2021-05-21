import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

const styles = StyleSheet.create({
  root: {
    marginTop: Constants.statusBarHeight,
    alignSelf: 'center',
    flexShrink: 0,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    width: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between', 
    backgroundColor: '#fff'
  },
  logo: {
    width: 120,
    height: 25,
  }
});

export default styles;