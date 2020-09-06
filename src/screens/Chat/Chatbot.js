import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import usersCollection, {
  database,
} from '../../../server/collections/usersCollection';
import AsyncStorage from '@react-native-community/async-storage';
import {GiftedChat, Actions, Bubble} from 'react-native-gifted-chat';
import CustomActions from './component/CustomActions';
import CustomView from './CustomView';
import {Dialogflow_V2} from 'react-native-dialogflow';
import RNFS from 'react-native-fs';
import {dialogflowConfig} from '../../helpers/env';
import {getLinkPreview} from 'link-preview-js';

const BOT_USER = {
  _id: 2,
  name: 'FAQ Bot',
  avatar: 'https://i.imgur.com/7k12EPD.png',
};

export default class Chatbot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
      numberCurrentMessage: 20,
    };

    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);
    this.compare = this.compare.bind(this);
    this.renderMessageImage = this.renderMessageImage.bind(this);

    this._isAlright = null;
  }

  compare(a, b) {
    if (a.createdAt > b.createdAt) {
      return -1;
    }
    if (a.createdAt < b.createdAt) {
      return 1;
    }
    return 0;
  }

  getData = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    await database
      .ref(`/${user.id}`)
      // .orderByChild('database/createdAt')
      // .orderBy('createdAt', 'desc')
      .limitToLast(this.state.numberCurrentMessage)
      .on('value', (snapshot) => {
        const value = Object.values(snapshot);
        if (value && Array.isArray(value) && value[0]['exists']) {
          const messages = Object.values(value[0]['value']).sort(this.compare);
          // console.log('messages: ', messages);
          this.setState(() => {
            return {
              isLoadingEarlier: false,
              messages: messages,
            };
          });
          // setMessages(messages);
        } else {
          // setMessages([]);
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

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id,
    );
  }

  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
        numberCurrentMessage: this.state.numberCurrentMessage + 20,
      };
    });

    this.getData();
  }

  renderMessageImage(props) {
    const images = [
      {
        // Simplest usage.
        url: props.currentMessage.image,
        // You can pass props to <Image />.
        props: {
          // headers: ...
        },
      },
      {
        props: {
          // Or you can set source directory.
          source: props.currentMessage.image,
        },
      },
    ];
    return (
      <TouchableOpacity
        onPress={() =>
          props.currentMessage.link
            ? Linking.openURL(props.currentMessage.link)
            : null
        }>
        <Image
          source={{uri: props.currentMessage.image}}
          style={{width: 200, height: 200}}
        />
      </TouchableOpacity>
    );
  }

  async onSend(messages = []) {
    messages[0].sent = true;
    messages[0].received = true;
    messages[0].createdAt = new Date(messages[0].createdAt).getTime();
    const user = await AsyncStorage.getItem('user');
    await usersCollection.writeRecord(user, messages[0]);

    let message = messages[0].text;

    if (message) {
      await Dialogflow_V2.requestQuery(
        message,
        (result) => this.handleGoogleResponse(result),
        (error) => console.log(error),
      );
    }
  }

  async handleGoogleResponse(result) {
    console.log('result: ', result);
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    await this.onReceive(text);
  }

  sendBotResponse(text) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT_USER,
    };

    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, [msg]),
    }));
  }

  async onReceive(text) {
    console.log('text: ', text);
    const user = await AsyncStorage.getItem('user');
    const link = text.match(/\bhttps?:\/\/\S+/gi);

    let listMessage = text.split(';').filter((e) => e.length > 0);
    const dataBot = {
      _id: Math.round(Math.random() * 1000000),
      text: text,
      createdAt: new Date().getTime(),
      user: {
        _id: 2,
        name: 'React Native',
      },
    };

    await Promise.all(
      listMessage.map((message) => {
        // const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
        // setTimeout(function () {
        usersCollection.writeRecord(user, {
          _id: Math.round(Math.random() * 1000000),
          text: message,
          createdAt: new Date().getTime(),
          user: {
            _id: 2,
            name: 'React Native',
          },
        });
        // }, 300);
      }),
    );

    if (link && link.length > 0) {
      console.log('link: ', link[0]);
      await getLinkPreview(link[0])
        .then(async (data) => {
          const dataLink = {
            url: data.url,
            image: data.images[0],
            title: data.title,
            description: data.description,
          };
          await usersCollection.writeRecordLink(user, dataLink);
          await usersCollection.writeRecord(user, {
            _id: Math.round(Math.random() * 1000000),
            text: data.title,
            link: data.url,
            image: data.images[0],
            createdAt: new Date().getTime(),
            user: {
              _id: 2,
              name: 'React Native',
            },
          });
        })
        .catch((error) => console.debug('error: ', error));
    }
  }

  renderCustomActions(props) {
    if (Platform.OS === 'android') {
      return <CustomActions {...props} onSend={this.onSend} />;
    }
    const options = {
      'Action 1': (props) => {
        alert('option 1');
      },
      'Action 2': (props) => {
        alert('option 2');
      },
      Cancel: () => {},
    };
    return <Actions {...props} options={options} />;
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: 'white',
          },
        }}
      />
    );
  }

  renderCustomView(props) {
    return <CustomView {...props} />;
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>{this.state.typingText}</Text>
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        loadEarlier={this.state.loadEarlier}
        onLoadEarlier={this.onLoadEarlier}
        isLoadingEarlier={this.state.isLoadingEarlier}
        renderMessageImage={this.renderMessageImage}
        user={{
          _id: 1, // sent messages should have same user._id
        }}
        isAnimated
        scrollToBottom
        renderActions={this.renderCustomActions}
        renderBubble={this.renderBubble}
        renderCustomView={this.renderCustomView}
        renderFooter={this.renderFooter}
      />
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});
