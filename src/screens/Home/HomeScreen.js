import React, {useEffect, useState} from 'react';
import {Text, View, Image, ImageBackground, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './style'
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
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chatbot')}>
            <Image source={require('../../assets/logo.png')} style={{width: 90, height: 50, margin: 10}}/>
            <Text>Chat with Bot</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
            <Image source={{uri: info.photo}} style={{width: 90, borderRadius: 5, height: 50, margin: 10}}/>
            <Text>Go to profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Menu')}>
            <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTnZ1FCCJbLKKDr8rBZjWPhfc4FjDcjuFC3Xw&usqp=CAU'}} style={{width: 90, height: 50, margin: 10, borderRadius: 5}}/>
            <Text>Go to menu</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 3}}></View>
    </View>
  );
}

export default HomeScreen;

