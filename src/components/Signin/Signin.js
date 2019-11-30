import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import { app, uiConfig } from "./firebase";
import "./Signin.scss";

function Signin() {
  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={app.auth()} />;
}

export default Signin;
