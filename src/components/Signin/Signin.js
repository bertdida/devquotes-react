import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Helmet } from "react-helmet";

import { app, uiConfig } from "./firebase";
import { AuthContext } from "../Auth";
import "./Signin.scss";

function Signin() {
  const [user] = useContext(AuthContext);

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>DevQuotes | Signin</title>
      </Helmet>

      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={app.auth()} />
    </React.Fragment>
  );
}

export default Signin;
