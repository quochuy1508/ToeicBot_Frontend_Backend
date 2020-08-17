import firebase from '@react-native-firebase/app';

var firebaseConfig = {
  apiKey: 'AIzaSyAByLZ6QFJuLAuuqkAxUXfCX480pPryTLM',
  authDomain: 'my-project-1595947665884.firebaseapp.com',
  databaseURL: 'https://my-project-1595947665884.firebaseio.com',
  projectId: 'my-project-1595947665884',
  storageBucket: 'my-project-1595947665884.appspot.com',
  messagingSenderId: '202766130146',
  appId: '1:202766130146:web:6333daf0bf3fcda2bb37bb',
  measurementId: 'G-7KFCQZD0JK',
};
// const firebaseConfig = {
//   apiKey: 'AIzaSyCfsCjLtxFlygOYsVP-Z8JnBQ2wika_mlI',
//   authDomain: 'realtimechatbot-20861.firebaseapp.com',
//   databaseURL: 'https://realtimechatbot-20861.firebaseio.com',
//   projectId: 'realtimechatbot-20861',
//   storageBucket: 'realtimechatbot-20861.appspot.com',
//   messagingSenderId: '843812250',
//   appId: '1:843812250:web:62c8983b6cf0c9a852be23',
//   measurementId: 'G-5VHYWTJKB9',
// };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
