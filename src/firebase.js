const firebase = require('firebase');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD7CHMJC4RlbI8MNaplwb5_D3mUuBXo07s",
  authDomain: "tictactoe-c2dbd.firebaseapp.com",
  databaseURL: "https://tictactoe-c2dbd.firebaseio.com",
  storageBucket: "tictactoe-c2dbd.appspot.com",
  messagingSenderId: "664947495401"
};
export const firebaseApp = firebase.initializeApp(config);
export const firebaseAuth = firebaseApp.auth()
export const database = firebase.database();

