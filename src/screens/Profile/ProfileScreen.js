import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './style';
import Button from '../../components/common/ProfileButton';

function ProfileScreen() {
  const [info, setInfo] = useState({});
  const [level, setLevel] = useState(0);
  let listLevel = ['450', '650', '850'];
  
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

  const onPress = (id) => {
    setLevel(id);
  }
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.info} source={{uri: info.photo}} imageStyle={{opacity: 0.4}} resizeMode="cover">
        <View style={styles.text}>
          <Text style={styles.name}>{info.name}</Text>
          <Text style={{color: 'white'}}>{info.email}</Text>
        </View>
        <Image source={{uri: info.photo}} style={styles.avt}/>
      </ImageBackground>
      <View style={styles.level}>
        <Text style={{color: 'white'}}>Trình độ TOEIC mong muốn đạt được: </Text>
        <Text style={{color: 'white', fontWeight: 'bold'}}>{listLevel[level]}+</Text>
      </View>
      <View style={{flex: 8, alignItems: "center"}}>
        {listLevel.map((value, id) => <Button name={value} key={value} active={id == level} onPress={() => onPress(id)}/>)}
      </View>
    </View>
  );
}

export default ProfileScreen;
