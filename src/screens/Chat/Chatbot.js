import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import usersCollection, {
  database,
} from '../../../server/collections/usersCollection';
import AsyncStorage from '@react-native-community/async-storage';
function Chatbot({userId}) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    await database.ref(`/${user.id}`).on('value', (snapshot) => {
      console.log('snapshot: ', snapshot);
      if (snapshot && Object.keys(snapshot).length > 0) {
        console.log('snapshot 1: ', snapshot.val());
        setMessages(Object.values(snapshot.val()).map((e) => e[0]) || {});
      } else {
        // await usersCollection.writeUser();
      }
    });
  };
  const onSend = useCallback(async (messages = []) => {
    const user = await AsyncStorage.getItem('user');
    console.log('messages: ', messages);
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
