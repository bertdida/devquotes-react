import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../Auth';

export function ProtectedRoute({ component: Component, ...props }) {
  const [user] = useContext(AuthContext);

  return (
    <Route
      {...props}
      render={_props =>
        user ? <Component {..._props} /> : <Redirect to="/signin" />
      }
    />
  );
}

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};
