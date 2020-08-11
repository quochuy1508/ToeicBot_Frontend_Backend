import {firebase} from '@react-native-firebase/database';
const database = firebase
  .app()
  .database('https://realtimechatbot-20861.firebaseio.com/');

export default {
  orderingRecord: async (ref) => {
    try {
      const data = await database().ref(ref).orderByValue().once('value');
    } catch (error) {
      console.log('error: ', error);
    }
  },
  writeRecord: async (userId) => {
    try {
      console.log('database: ', database);
      await database
        .ref(`/users/${userId}`)
        .set({
          name: 'Ada Lovelace',
        })
        .then(() => console.log('Data set.'));
    } catch (error) {
      console.log('error: ', error);
    }
  },
};
