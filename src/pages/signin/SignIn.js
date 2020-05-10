import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Helmet } from 'react-helmet';
import firebase from 'firebase/app';
import 'firebase/auth';

import { app } from 'common/firebase';
import { AuthContext } from 'common/Auth';
import './SignIn.scss';

const uiConfig = {
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

export function SignIn() {
  const [user] = useContext(AuthContext);

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>DevQuotes | Sign In</title>
      </Helmet>

      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={app.auth()} />
    </React.Fragment>
  );
}
