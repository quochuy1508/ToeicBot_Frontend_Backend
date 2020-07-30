import React from 'react';
import { View, StyleSheet } from 'react-native';
import Noti from 'react-native-vector-icons/Octicons';
import Set from 'react-native-vector-icons/MaterialIcons';

function NotiSet({navigation}) {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row', 
      alignItems: 'center',
      marginRight: 10,
    },
    iconStyle: {
        marginRight: 20,
    }
  });
  return (
    <View style={styles.container}>
        <Noti 
          style={styles.iconStyle} 
          name="bell" color="gray" 
          size={24}
          onPress={() => navigation.navigate("Notifications")}
        />
        <Set name="settings" 
          size={24} 
          color="gray" 
          onPress={() => navigation.navigate("Settings")}/>
    </View>
  );
}

export default NotiSet;
