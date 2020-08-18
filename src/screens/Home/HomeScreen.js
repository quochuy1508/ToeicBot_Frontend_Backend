import React from 'react';
import {Text, View, StatusBar} from 'react-native';
import styles from './style';
import Card from '../../components/common/RecommendedCard';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Recommended for you</Text>
      <Card  
        url="https://www.anhngumshoa.com/tin-tuc/toeic-la-gi-bang-toeic-chung-chi-toeic-co-gia-tri-nhu-the-nao-36242.html"
        image="https://llv.edu.vn/media/2017/11/logo-toeic-15440892075481729847449.jpg"
        title="TOEIC là gì? Bằng TOEIC, chứng chỉ TOEIC có giá trị như thế nào?"
      />
      <View style={{flex: 3}}></View>
      <StatusBar backgroundColor="deepskyblue"/>
    </View>
  );
}

export default HomeScreen;

