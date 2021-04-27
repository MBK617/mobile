import React from 'react';
import { 
  View, 
  Text, 
  TouchableHighlight, 
  Linking, 
  Alert 
} from "react-native";
import { 
  MaterialCommunityIcons as Icon, 
  Feather as FeatherIcon 
} from '@expo/vector-icons'

import useHistory from 'hooks/useHistory';

import styles from './styles';

const Navigation = ({ routes }) => {
  const { goTo } = useHistory();

  return (
    <View style={styles.root}>
      {routes.map(route =>  
        route.show && 
          <TouchableHighlight 
            underlayColor="rgba(0,0,0,0.1)" 
            key={route.name} 
            onPress={() => {
              if(route.key) goTo(`more/${route.key}`);
              if(route.external) Linking.canOpenURL(route.external).then(supported => {
                if(supported) {
                  Linking.openURL(route.external);
                } else {
                  Alert.alert("Can't open this link in your default browser.")
                }
              })
            }}
          >
            <View style={styles.item} >
              <View style={styles.itemInfo}>
                <Icon 
                  name={route.icon} 
                  size={40} 
                />
                <Text
                  style={styles.itemName}
                >
                  {route.name}
                </Text>
              </View>
              {route.external ? <FeatherIcon
                name= "external-link"
                size={32}
                style={{ marginLeft: -10 }}
              /> : <Icon
                name="chevron-right"
                size={42}
              /> }
            </View>
          </TouchableHighlight>
      )}
    </View>
  );
}

export default Navigation;