import React, { useState, useEffect, createContext } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

import { app } from "./Signin/firebase";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    app.auth().onAuthStateChanged(async user => {
      if (user) {
        const token = await user.getIdToken();
      }

      setUser(user);
      setIsAuthenticating(false);
    });
  }, []);

  if (isAuthenticating) {
    return <LinearProgress color="secondary" />;
  }

  return <AuthContext.Provider value={[user]}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
