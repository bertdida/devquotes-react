import React, { useState, useEffect, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import firebase from 'firebase/app';
import 'firebase/auth';

import api from 'common/api';

const { signIn } = api;

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
});

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(async firebaseUser => {
        if (firebaseUser) {
          const token = await firebaseUser.getIdToken();
          const response = await signIn(token);
          setUser(response.data.data);
        } else {
          setUser(null);
        }

        setIsAuthenticating(false);
      });

    return function cleanUp() {
      unsubscribe();
    };
  }, []);

  async function signOut() {
    await firebase.auth().signOut();
    setUser(null);
  }

  if (isAuthenticating) {
    return <LinearProgress color="secondary" />;
  }

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
