import firebase from 'firebase';

import { firebaseApp, firebaseAuth, database } from '../firebase.js';

const loginSuccess = user => {
  return {
    type: 'LOGIN_SUCCESS',
    payload: user
  };
}

const logoutSuccess = () => {
  return {
    type: 'LOGOUT_SUCCESS'
  }
}

export const login = (providerName = 'github') => {
  let provider = new firebase.auth.GithubAuthProvider();
  switch (providerName) {
    case 'github':
      return loginWithProvider(provider);
    case 'google':
      provider = new firebase.auth.GoogleAuthProvider();
      return loginWithProvider(provider);
    default:
      console.error('unknown provider name', providerName);
  }
}

const loginWithProvider = (provider) => {
  return dispatch => {
    firebaseAuth.signInWithProvider(provider)
      .then(result => dispatch(loginSuccess(result.user)))
  }
}

export const logout = () => {
  return dispatch => {
    firebaseAuth.signOut()
      .then(() => dispatch(logoutSuccess()))
  }
}

export const initAuth = () => {
  return dispatch => {
    const unsub = firebaseAuth.onAuthStateChanged(
      user => {
        if (!!user) {
          dispatch(loginSuccess(user));
          unsub();
        }
      })
  }
}

// old actions - to modify


// function loginWithGoogle() {
//   const provider = new firebase.auth.GoogleAuthProvider();
//   const auth = firebase.auth();
//   return auth.signInWithPopup(provider).then(function (result) {
//     var user = result.user;
//     return getUserState(user.uid);
//   }).catch(function (error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     console.log("signInWithPopup", errorCode, errorMessage);
//   });
// }

// function loginWithGitHub() {
//   const provider = new firebase.auth.GithubAuthProvider();
//   const auth = firebase.auth();
//   return auth.signInWithPopup(provider).then(function (result) {
//     var user = result.user;
//     return getUserState(user.uid);
//   }).catch(function (error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     console.log("signInWithPopup", errorCode, errorMessage);
//   });
// }


function writeUserState(state) {
  if (isAuth()) {
    const userId = firebase.auth().currentUser.uid;
    database.ref('users/' + userId).set({
      state: state
    });
  }
}

function getUserState(userId) {
  return database.ref('/users/' + userId).once('value').then(function (snapshot) {
    return snapshot.val().state;
  });
}

function isAuth() {
  const userId = firebase.auth()
  return userId !== null ? true : false
}

// module.exports = { writeUserState, login, isAuth, initAuth }