import { App } from "components";
import * as firebase from "firebase";
import React from "react";
import ReactDOM from "react-dom";
import "styles/fonts.scss";
import "styles/index.scss";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  appId: "1:600507081671:web:acf828e427865ecb0c2fe2",
  authDomain: "boerigter-center-app.firebaseapp.com",
  databaseURL: "https://boerigter-center-app.firebaseio.com",
  messagingSenderId: "600507081671",
  projectId: "boerigter-center-app",
  storageBucket: "boerigter-center-app.appspot.com",
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);
