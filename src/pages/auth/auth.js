import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCPV9cKULq9wzCnme4u3FU1aInf7yLZuCg',
  authDomain: 'kumabook-c675d.firebaseapp.com',
  databaseURL: 'https://kumabook-c675d.firebaseio.com',
  projectId: 'kumabook-c675d',
  storageBucket: 'kumabook-c675d.appspot.com',
  messagingSenderId: '608657777718',
  appId: '1:608657777718:web:8d64158cc26f0a2b17e497',
  measurementId: 'G-P67ZJ17NVZ',
};
firebase.initializeApp(firebaseConfig);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
