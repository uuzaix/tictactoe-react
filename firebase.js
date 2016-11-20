const firebase = require('firebase');

// Initialize Firebase
var config = {
  apiKey: "xxx",
  authDomain: "xxx",
  databaseURL: "xxx",
  storageBucket: "xxx",
  messagingSenderId: "xxx"
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
  const userId = firebase.auth().currentUser.uid;
  database.ref('users/' + userId).set({
    state: state
  });
}

function getUserState(userId) {
  return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
    return snapshot.val().state;
  });
}

module.exports = { writeUserState, login }

