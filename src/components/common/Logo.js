import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

function Logo({logosize, textsize, color}) {
  const styles = StyleSheet.create({
    logo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    appName: {
      fontWeight: 'bold',
      fontSize: textsize,
      marginLeft: 20,
      color: color,
    },
  });
  return (
    <View style={styles.logo}>
      <Icon name="robot" color="deepskyblue" size={logosize} />
      <Text style={styles.appName}>BotStudy</Text>
    </View>
  );
}

export default Logo;
