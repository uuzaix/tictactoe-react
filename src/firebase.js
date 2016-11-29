const firebase = require('firebase');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD7CHMJC4RlbI8MNaplwb5_D3mUuBXo07s",
  authDomain: "tictactoe-c2dbd.firebaseapp.com",
  databaseURL: "https://tictactoe-c2dbd.firebaseio.com",
  storageBucket: "tictactoe-c2dbd.appspot.com",
  messagingSenderId: "664947495401"
};
firebase.initializeApp(config);

function login() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const auth = firebase.auth();
  return auth.signInWithPopup(provider).then(function (result) {
    var user = result.user;
    return getUserState(user.uid);
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("error", errorCode, errorMessage);
  });
}

const btnLogout = document.getElementById('logout');
btnLogout.addEventListener('click', e => {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
    console.log('signout is successful');
  }, function (error) {
    // An error happened.
    console.log('logout error', error);
  });
})

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser);
    btnLogout.classList.remove('hide');
    // btnLogin.classList.add('hide');
  } else {
    console.log('not signed in');
    // btnLogin.classList.remove('hide');
    btnLogout.classList.add('hide');
  }
});

const database = firebase.database();

function writeUserState(state) {
  if (isAuth()) {
    const userId = firebase.auth().currentUser.uid;
    database.ref('users/' + userId).set({
      state: state
    });
  }
}

function getUserState(userId) {
  return firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
    return snapshot.val().state;
  });
}

function isAuth() {
  const userId = firebase.auth()
  return userId !== null ? true : false
}

function initAuth(dispatch) {
  if (isAuth) {
    const userId = firebase.auth();
    const state =  getUserState(userId.uid);
    dispatch({ type: 'RECEIVE_STATE', payload: state });
  }
}

module.exports = { writeUserState, login, isAuth, initAuth }

