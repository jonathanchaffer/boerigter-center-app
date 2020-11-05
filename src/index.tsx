import { App } from "components";
import { UserProvider } from "contexts";
import * as firebase from "firebase";
import React from "react";
import ReactDOM from "react-dom";
import "styles/fonts.scss";
import "styles/index.scss";

const firebaseConfig = {
  apiKey: "AIzaSyBhvXuBAQBCLHxhM-2QWnYRxDlZ4oZhDhg",
  appId: "1:600507081671:web:acf828e427865ecb0c2fe2",
  authDomain: "boerigter-center-app.firebaseapp.com",
  databaseURL: "https://boerigter-center-app.firebaseio.com",
  messagingSenderId: "600507081671",
  projectId: "boerigter-center-app",
  storageBucket: "boerigter-center-app.appspot.com",
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = firebase.auth();

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
