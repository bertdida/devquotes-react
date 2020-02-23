import React, { useState, useEffect, createContext } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

import { app } from "../Signin/firebase";
import { signIn } from "./api-calls";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    app.auth().onAuthStateChanged(async firebaseUser => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        const response = await signIn(token);
        firebaseUser = response.data.data;
      }

      setUser(firebaseUser);
      setIsAuthenticating(false);
    });
  }, []);

  if (isAuthenticating) {
    return <LinearProgress color="secondary" />;
  }

  return <AuthContext.Provider value={[user]}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };