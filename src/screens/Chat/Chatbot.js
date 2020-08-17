import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';
import usersCollection from '../../../server/collections/usersCollection';
import AsyncStorage from '@react-native-community/async-storage';

function Chatbot({userId}) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello ',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'BOT',
          avatar: require('../../assets/logo.png'),
        },
      },
    ]);
  }, []);

  const getData = () => {
    database.ref(`notes/`).on('value', function (snapshot) {
      setData(snapshot.val());
    });
  };
  const onSend = useCallback(async (messages = []) => {
    const user = await AsyncStorage.getItem('user');
    await usersCollection.writeRecord(user, messages);
    setMessages((previousMessages) => {
      return GiftedChat.append(previousMessages, messages);
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
}

export default Chatbot;
