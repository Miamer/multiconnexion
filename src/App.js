import React, { useState } from "react";
import firebase from "./database";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserdata] = useState({});

  var googleProvider = new firebase.auth.GoogleAuthProvider();
  var facebookProvider = new firebase.auth.FacebookAuthProvider();
  var twitterProvider = new firebase.auth.TwitterAuthProvider();

  function userLogin() {
    if (email === "" || password === "") {
      console.log("Entrer email et/ou mot de passe ");
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (res) => {
          const idTokenResult = await firebase
            .auth()
            .currentUser.getIdTokenResult();
          let user = await firebase.auth().currentUser;
          setUserdata({
            name: user.displayName,
            email: user.email,
            token: idTokenResult.token,
            uid: user.iud,
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }

  function authLoginProv(provider) {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (result) => {
        const idTokenResult = await firebase
            .auth()
            .currentUser.getIdTokenResult();
        let user = await firebase.auth().currentUser;
        setUserdata({
          name: user.displayName,
          email: user.email,
          token: idTokenResult.token,
          uid: user.iud,
        });
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function logout() {
    firebase.auth().signOut();
    console.log("déconnecté");
    setUserdata({});
    setEmail("");
    setPassword("");
  }

  return (
    <div className="App">
      <p>
        Login:
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {email}
      </p>
      <p>
        Mot de passe:
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {password}
      </p>
      <button
        onClick={() => {
          userLogin();
        }}
      >
        Connexion LoginMdp
      </button>

      <p>-----------------------------</p>

      <button
        onClick={() => {
          authLoginProv(googleProvider);
        }}
      >
        Google
      </button>

      <button
        onClick={() => {
          authLoginProv(facebookProvider);
        }}
      >
        Facebook
      </button>

      <button
        onClick={() => {
          authLoginProv(twitterProvider);
        }}
      >
        Twitter
      </button>

      <p>-----------------------------</p>

      <p>userDataName: {userData.name}</p>
      <p>userDataemail: {userData.email}</p>
      <p>userDataToken: {userData.token}</p>
      <p>userDatauid: {userData.uid}</p>

      <p>-----------------------------</p>

      <button
        onClick={() => {
          logout();
        }}
      >
        LogOut
      </button>
    </div>
  );
}

export default App;
