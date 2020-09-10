import React, {Component} from 'react';
import {Text, ScrollView, StatusBar} from 'react-native';
import styles from './style';
import Card from '../../components/common/RecommendedCard';
import AsyncStorage from '@react-native-community/async-storage';
import usersCollection, {
  database,
} from '../../../server/collections/usersCollection';
import ysn from './data/youShouldKnow.json';
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
              links: [
                ...Object.values(value[0]['value'])
              ],
            };
          });
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
    let r = Math.floor(Math.random() * 3);
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.text}>Những điều bạn cần biết</Text>
        <Card
            key={Math.random()}
            url={ysn[r].url}
            image={ysn[r].image}
            title={ysn[r].title}
        />
        <Text style={styles.text}>Đề xuất dành cho bạn</Text>
        {this.state.links.map((link) => (
          <Card
            key={Math.random()}
            url={link['url']}
            image={link['image']}
            title={link['title']}
          />
        ))}
        <StatusBar backgroundColor="deepskyblue" />
      </ScrollView>
    );
  }
}

export default HomeScreen;
