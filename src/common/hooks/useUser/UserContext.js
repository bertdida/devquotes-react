import React, { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import firebase from 'firebase/app';
import 'firebase/auth';

import api from 'common/api';
import reducer from './reducer';
import actions from './actions';

const { signIn } = api;

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
});

export const StateContext = createContext();
export const DispatchContext = createContext();

export const useUserState = () => useContext(StateContext);
export const useUserDispatch = () => useContext(DispatchContext);

const initialState = { user: null, isAuthenticating: true };

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, isAuthenticating } = state;

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(async firebaseUser => {
        if (firebaseUser) {
          const token = await firebaseUser.getIdToken();
          const response = await signIn(token);
          dispatch({ type: actions.SIGN_IN, payload: { response } });
        } else {
          dispatch({ type: actions.SIGN_OUT });
        }

        dispatch({ type: actions.AUTHENTICATION_COMPLETE });
      });

    return function cleanUp() {
      unsubscribe();
    };
  }, []);

  if (isAuthenticating) {
    return <LinearProgress color="secondary" />;
  }

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={user}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
