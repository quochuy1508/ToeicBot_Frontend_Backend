import React, {Component} from 'react';
import {Text, View, StatusBar} from 'react-native';
import styles from './style';
import Card from '../../components/common/RecommendedCard';
import AsyncStorage from '@react-native-community/async-storage';
import usersCollection, {
  database,
} from '../../../server/collections/usersCollection';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
    };

    this._isMounted = false;
  }

  getData = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    await database
      .ref(`/${user.id}-link`)
      // .orderByChild('database/createdAt')
      // .orderBy('createdAt', 'desc')
      .on('value', (snapshot) => {
        const value = Object.values(snapshot);
        if (value && Array.isArray(value) && value[0]['exists']) {
          // console.log('messages: ', messages);
          this.setState(() => {
            return {
              links: Object.values(value[0]['value']).push({
                url:
                  'https://www.anhngumshoa.com/tin-tuc/toeic-la-gi-bang-toeic-chung-chi-toeic-co-gia-tri-nhu-the-nao-36242.html',
                image:
                  'https://llv.edu.vn/media/2017/11/logo-toeic-15440892075481729847449.jpg',
                title:
                  'TOEIC là gì? Bằng TOEIC, chứng chỉ TOEIC có giá trị như thế nào?',
              }),
            };
          });
        } else {
        }
      });
  };
  UNSAFE_componentWillMount() {
    this._isMounted = true;
    this.getData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Đề xuất dành cho bạn</Text>
        {this.state.links.map((link) => (
          <Card
            key={link['title']}
            url={link['url']}
            image={link['image']}
            title={link['title']}
          />
        ))}

        <View style={{flex: 3}}></View>
        <StatusBar backgroundColor="deepskyblue" />
      </View>
    );
  }
}

export default HomeScreen;
