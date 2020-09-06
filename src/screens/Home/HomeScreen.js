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
              links: Object.values(value[0]['value']),
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
