import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './style';

function ProfileScreen() {
const [info, setInfo] = useState({});
async function getUserInfo() {
    try {
    const jsonValue = await AsyncStorage.getItem('user');
    setInfo(JSON.parse(jsonValue));
    } catch(e) {
    // error reading value
    }
}
useEffect(() => {
    getUserInfo()
},[]);
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.info} source={{uri: info.photo}} imageStyle={{opacity: 0.4}}>
        <Image source={{uri: info.photo}} style={styles.avt}/>
        <View style={styles.text}>
          <Text style={styles.name}>{info.name}</Text>
          <Text style={{color: 'white'}}>{info.email}</Text>
        </View>
      </ImageBackground>
      <View style={{flex: 3}}></View>
    </View>
  );
}

export default ProfileScreen;
