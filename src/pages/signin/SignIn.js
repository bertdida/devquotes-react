import React, { useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Helmet } from 'react-helmet';
import firebase from 'firebase/app';

import { useUserState } from 'common/hooks/useUser';
import { useTheme } from 'common/hooks/useTheme';
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
  const user = useUserState();
  const { theme } = useTheme();
  const root = useRef();

  useEffect(() => {
    const { palette } = theme;
    const styleProperties = [
      {
        name: '--color-background',
        value: palette.background.paper,
      },
      {
        name: '--color-primary',
        value: palette.secondary.main,
      },
      {
        name: '--color-error',
        value: palette.error.main,
      },
      {
        name: '--color-button-text',
        value: palette.primary.contrastText,
      },
    ];

    styleProperties.forEach(({ name, value }) => {
      root.current.style.setProperty(name, value);
    });
  }, [theme]);

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Helmet>
        <title>DevQuotes | Sign In</title>
      </Helmet>

      <div ref={root}>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    </>
  );
}
