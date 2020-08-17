import React from 'react';
import {Text, View} from 'react-native';
import styles from './style';
import NavButton from '../../components/common/NavButton';
import Card from '../../components/common/RecommendedCard';

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Recommended for you</Text>
      <Card  
        url="https://www.anhngumshoa.com/tin-tuc/toeic-la-gi-bang-toeic-chung-chi-toeic-co-gia-tri-nhu-the-nao-36242.html"
        image="https://llv.edu.vn/media/2017/11/logo-toeic-15440892075481729847449.jpg"
        title="TOEIC là gì? Bằng TOEIC, chứng chỉ TOEIC có giá trị như thế nào?"
      />
      <View style={styles.buttonContainer}>
        <NavButton name="Chatbot" navigation={navigation}/>
        <NavButton name="Profile" navigation={navigation}/>
        <NavButton name="Settings" navigation={navigation}/>
      </View>
      <View style={{flex: 2}}></View>
    </View>
  );
}

export default HomeScreen;

