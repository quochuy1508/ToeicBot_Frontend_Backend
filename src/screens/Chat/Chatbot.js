import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import usersCollection, {
  database,
} from '../../../server/collections/usersCollection';
import AsyncStorage from '@react-native-community/async-storage';
import {GiftedChat, Actions, Bubble} from 'react-native-gifted-chat';
import CustomActions from './CustomActions';
import CustomView from './CustomView';
import {Dialogflow_V2} from 'react-native-dialogflow';
import {dialogflowConfig} from '../../helpers/env';

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
    };

    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);

    this._isAlright = null;
  }

  getData = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    await database.ref(`/${user.id}`).on('value', (snapshot) => {
      const value = Object.values(snapshot);
      if (value && Array.isArray(value) && value[0]['exists']) {
        const messages = Object.values(value[0]['value']);
        // console.log('messages: ', messages);
        this.setState(() => {
          return {
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
      };
    });

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.prepend(
              previousState.messages,
              require('./data/old_messages.js'),
            ),
            loadEarlier: false,
            isLoadingEarlier: false,
          };
        });
      }
    }, 1000); // simulating network
  }

  async onSend(messages = []) {
    // this.setState((previousState) => {
    //   return {
    //     messages: GiftedChat.append(previousState.messages, messages),
    //   };
    // });

    messages[0].sent = true;
    messages[0].received = true;
    messages[0].createdAt = new Date(messages[0].createdAt).getTime();
    console.log('messages send: ', messages);
    const user = await AsyncStorage.getItem('user');
    await usersCollection.writeRecord(user, messages[0]);

    let message = messages[0].text;
    await Dialogflow_V2.requestQuery(
      message,
      (result) => this.handleGoogleResponse(result),
      (error) => console.log(error),
    );
    // for demo purpose
    // this.answerDemo(messages);
  }

  handleGoogleResponse(result) {
    console.log('result: ', result);
    // let text = result.queryResult.fulfillmentMessages[0].text.text[0] ? "A" : "B";
    let text = 'Response from bot';
    this.onReceive(text);
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
    const user = await AsyncStorage.getItem('user');
    const dataBot = {
      _id: Math.round(Math.random() * 1000000),
      text: text,
      createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
      user: {
        _id: 2,
        name: 'React Native',
      },
    };
    await usersCollection.writeRecord(user, dataBot);
  }

  renderCustomActions(props) {
    if (Platform.OS === 'ios') {
      return <CustomActions {...props} />;
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
            backgroundColor: '#f0f0f0',
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
        user={{
          _id: 1, // sent messages should have same user._id
        }}
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
