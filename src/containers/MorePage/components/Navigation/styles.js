import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  item: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  itemName: {
    fontSize: 18,
    marginLeft: 15,
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default styles;