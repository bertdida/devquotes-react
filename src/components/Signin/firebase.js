import { default as googleFirebase } from "firebase";

const app = googleFirebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});

const uiConfig = {
  signInOptions: [
    googleFirebase.auth.EmailAuthProvider.PROVIDER_ID,
    googleFirebase.auth.GoogleAuthProvider.PROVIDER_ID,
    googleFirebase.auth.FacebookAuthProvider.PROVIDER_ID,
    googleFirebase.auth.TwitterAuthProvider.PROVIDER_ID,
    googleFirebase.auth.GithubAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

export { app, uiConfig };