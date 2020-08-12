import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

function Logo({logosize, textsize, color}) {
  const styles = StyleSheet.create({
    logo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    img: {
      width: logosize,
      height: logosize
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
      <Image source={require("../../assets/logo.png")} style={styles.img}/>
      <Text style={styles.appName}>ToeicBot</Text>
    </View>
  );
}

export default Logo;
