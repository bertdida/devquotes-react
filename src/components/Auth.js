import React, { useState, useEffect, createContext } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";

import { app } from "./Signin/firebase";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    app.auth().onAuthStateChanged(async firebaseUser => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        const response = await axios.post("/v1/auth/token", { token });
        firebaseUser = response.data;
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
