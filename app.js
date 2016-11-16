// import firebase from 'firebase';

// Initialize Firebase
(function () {
  var config = {
    apiKey: "xxx",
    authDomain: "xxx",
    databaseURL: "xxx",
    storageBucket: "xxx",
    messagingSenderId: "xxx"
  };
  firebase.initializeApp(config);

  const login = document.getElementById('login');

  const dbRefObject = firebase.database().ref().child('login');

  const btnLogin = document.getElementById('login');

  btnLogin.addEventListener('click', e => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const auth = firebase.auth();
    auth.signInWithRedirect(provider);
    auth.getRedirectResult().then(function (result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        console.log("token", token);
        // ...
      }
      // The signed-in user info.
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

  })





})();


