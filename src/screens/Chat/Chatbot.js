import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';
import usersCollection from '../../../server/collections/usersCollection';
import AsyncStorage from '@react-native-community/async-storage';

function Chatbot({userId}) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const onValueChange = database()
      .ref(`/users/${userId}`)
      .on('value', (snapshot) => {
        console.log('User data: ', snapshot.val());
      });
    console.log('onValueChange: ', onValueChange);
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback(async (messages = []) => {
    const user = await AsyncStorage.getItem('user');
    await usersCollection.writeRecord(user.id);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
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
