import { App } from "components";
import {
  BackgroundLoaderProvider,
  HandshakeCareersContext,
  PeopleGroveAlumniContext,
  UserProvider,
} from "contexts";
import * as firebase from "firebase";
import React from "react";
import ReactDOM from "react-dom";
import { fetchHandshakeCareers, getAllPeopleGroveAlumni } from "services";
import "styles/fonts.scss";
import "styles/index.scss";
import { commaSeparatedList } from "utilities";

const requiredEnvContents = ["REACT_APP_GOOGLE_API_KEY", "REACT_APP_HANDSHAKE_API_KEY"];

const missingEnvContents: string[] = [];
requiredEnvContents.forEach(key => {
  if (!process.env[key]) {
    missingEnvContents.push(key);
  }
});
if (missingEnvContents.length > 0) {
  // eslint-disable-next-line no-console
  console.error(
    `Your local environment is missing the following keys: ${commaSeparatedList(
      missingEnvContents,
    )}. Make sure that you have an .env file in your root directory with the required contents.`,
  );
}

const firebaseConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
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
      <BackgroundLoaderProvider
        numPages={100}
        fetchFn={fetchHandshakeCareers}
        context={HandshakeCareersContext}
      >
        <BackgroundLoaderProvider
          fetchFn={getAllPeopleGroveAlumni}
          context={PeopleGroveAlumniContext}
        >
          <App />
        </BackgroundLoaderProvider>
      </BackgroundLoaderProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
