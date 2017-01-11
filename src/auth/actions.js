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

const login = (providerName = 'github') => {
  let provider = new firebase.auth.GithubAuthProvider();
  switch (providerName) {
    case 'github':
      return loginWithProvider(provider);
    case 'google':
      provider = new firebase.auth.GoogleAuthProvider();
      return loginWithProvider(provider);
    default:
      console.error('Oops. unknown provider name', providerName);
  }
}

const loginWithProvider = (provider) => {
  return dispatch => {
    firebaseAuth.signInWithPopup(provider)
      .then(result => dispatch(loginSuccess(result.user)))
  }
}

export const loginWithGitHub = () => {
  const provider = new firebase.auth.GithubAuthProvider();
  return loginWithProvider(provider);
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

// function writeUserState(state) {
//   if (isAuth()) {
//     const userId = firebase.auth().currentUser.uid;
//     database.ref('users/' + userId).set({
//       state: state
//     });
//   }
// }

// function getUserState(userId) {
//   return database.ref('/users/' + userId).once('value').then(function (snapshot) {
//     return snapshot.val().state;
//   });
// }

// function isAuth() {
//   const userId = firebase.auth()
//   return userId !== null ? true : false
// }