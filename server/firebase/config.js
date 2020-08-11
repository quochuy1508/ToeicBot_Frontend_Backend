import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCfsCjLtxFlygOYsVP-Z8JnBQ2wika_mlI',
  authDomain: 'realtimechatbot-20861.firebaseapp.com',
  databaseURL: 'https://realtimechatbot-20861.firebaseio.com',
  projectId: 'realtimechatbot-20861',
  storageBucket: 'realtimechatbot-20861.appspot.com',
  messagingSenderId: '843812250',
  appId: '1:843812250:web:62c8983b6cf0c9a852be23',
  measurementId: 'G-5VHYWTJKB9',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
