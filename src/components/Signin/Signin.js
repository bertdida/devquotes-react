import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import { app, uiConfig } from "./firebase";
import { AuthContext } from "../Auth";
import "./Signin.scss";

function Signin() {
  const [user] = useContext(AuthContext);

  if (user) {
    return <Redirect to="/" />;
  }

  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={app.auth()} />;
}

export default Signin;
