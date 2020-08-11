import React, {useEffect, useState} from 'react';
import {Text, View, Image, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './style';
import NavButton from '../../components/common/NavButton';

function HomeScreen({navigation}) {
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
        <View>
          <Text style={styles.name}>{info.name}</Text>
          <Text style={{color: 'white'}}>{info.email}</Text>
        </View>
      </ImageBackground>
      <View style={{flex: 2, padding: 10}}>
        <Text style={{fontSize: 15}}>Welcome to BotStudy!</Text>
        <View style={{flexDirection: 'row'}}>
          <NavButton name="Chatbot" navigation={navigation}/>
          <NavButton name="Profile" navigation={navigation} uri={info.photo}/>
          <NavButton name="Menu" navigation={navigation}/>
        </View>
      </View>
      <View style={{flex: 3}}></View>
    </View>
  );
}

export default HomeScreen;

