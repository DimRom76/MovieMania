import firebase from '@firebase/app';
import '@firebase/analytics';

var firebaseConfig = {
  apiKey: 'AIzaSyDxhL1yChcVJg9Bh5SNQIDffedtmC-aqsQ',
  authDomain: 'filmo-mania.firebaseapp.com',
  databaseURL: 'https://filmo-mania-default-rtdb.firebaseio.com',
  projectId: 'filmo-mania',
  storageBucket: 'filmo-mania.appspot.com',
  messagingSenderId: '344881823410',
  appId: '1:344881823410:web:f403c34ee2c35adf5653ab',
  measurementId: 'G-EBY8MDBS7Y',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
