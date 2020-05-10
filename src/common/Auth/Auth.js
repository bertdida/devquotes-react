import React, { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import 'firebase/auth';

import { app } from 'common/firebase';
import * as api from './api-calls';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    app.auth().onAuthStateChanged(async firebaseUser => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        const response = await api.signIn(token);
        setUser(response.data.data);
      } else {
        setUser(null);
      }

      setIsAuthenticating(false);
    });
  }, []);

  if (isAuthenticating) {
    return <LinearProgress color="secondary" />;
  }

  return <AuthContext.Provider value={[user]}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
