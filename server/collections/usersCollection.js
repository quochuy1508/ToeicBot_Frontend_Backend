import {firebase} from '@react-native-firebase/database';
const database = firebase
  .app()
  .database('https://my-project-1595947665884.firebaseio.com/');

export default {
  orderingRecord: async (ref) => {
    try {
      const data = await database().ref(ref).orderByValue().once('value');
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
        .push({
          _id: new Date().getTime(),
          text: messages[0]['text'],
          createdAt: new Date(),
          user: {
            _id: infoUser.id,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        })
        .then(() => console.log('Data set.'));
    } catch (error) {
      console.log('error: ', error);
    }
  },
};
