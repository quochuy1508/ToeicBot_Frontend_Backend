import {firebase} from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage';

export const database = firebase
  .app()
  .database('https://my-project-1595947665884.firebaseio.com/');

export default {
  orderingRecord: async (ref) => {
    try {
      const data = await database().ref(ref).orderByValue().once('value');
      console.log('data: ', data);
    } catch (error) {
      console.log('error: ', error);
    }
  },
  writeRecord: async (user, messages) => {
    try {
      // console.log('user: ', user);
      // console.log('messages: ', messages);
      const infoUser = JSON.parse(user);
      // const message = JSON.parse(messages[0]);

      await database
        .ref(`${infoUser.id}`)
        .push(messages)
        .then(() => console.log('Data set.'));
    } catch (error) {
      console.log('error: ', error);
    }
  },
  writeUser: async () => {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    const infoUser = JSON.parse(user);
    await database.push(infoUser.id);
  },
  readRecord: async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      let data = {};
      await database.ref(`/${user.id}`).on('value', (querySnapShot) => {
        data = querySnapShot.val() ? querySnapShot.val() : {};
        console.log('data: '.data);
      });

      return data;
      // .then(() => console.log('Data set.'));
    } catch (error) {
      console.log('error: ', error);
    }
  },
};
