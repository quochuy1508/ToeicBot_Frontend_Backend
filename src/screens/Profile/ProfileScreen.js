import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './style';
import Logout from '../../components/logout';
import Button from '../../components/common/SettingButton';

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
      <View style={styles.bar}>
        <View style={styles.info}>
          <Image source={{uri: info.photo}} style={styles.avt}/>
          <View style={styles.text}>
            <Text style={styles.name}>{info.name}</Text>
            <Text style={{color: 'gray'}}>{info.email}</Text>
          </View>
        </View>
        <View style={styles.logout}>
          <Logout />
        </View>
      </View>
      <View style={{flex: 3}}>
        <Button name='feedback'/>
        <Button name='like'/>
        <Button name='rate'/>
        <Button name='share'/>
        <View style={{flex: 2}} />
      </View>
    </View>
  );
}

export default ProfileScreen;
