// Initialize Firebase
(function () {
  var config = {
    apiKey: "AIzaSyD7CHMJC4RlbI8MNaplwb5_D3mUuBXo07s",
    authDomain: "tictactoe-c2dbd.firebaseapp.com",
    databaseURL: "https://tictactoe-c2dbd.firebaseio.com",
    storageBucket: "tictactoe-c2dbd.appspot.com",
    messagingSenderId: "664947495401"
  };
  firebase.initializeApp(config);

  //const dbRefObject = firebase.database().ref().child('login');

  const btnLogin = document.getElementById('login');

  btnLogin.addEventListener('click', e => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const auth = firebase.auth();
    auth.signInWithPopup(provider).then(function (result) {
      var token = result.credential.accessToken;
      console.log("token", token);
      var user = result.user;
      console.log("user", user);
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("error", errorCode, errorMessage);
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  });
  const btnLogout = document.getElementById('logout');
  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut().then(function() {
  // Sign-out successful.
  console.log('signout is successful');
}, function(error) {
  // An error happened.
  console.log('logout error', error);
});
  })

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      console.log(firebaseUser);
      btnLogout.classList.remove('hide');
      btnLogin.classList.add('hide');
    } else {
      console.log('not signed in');
      btnLogin.classList.remove('hide');
      btnLogout.classList.add('hide');
    }
  });


})();


