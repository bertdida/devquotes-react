import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from 'common/hooks/useAuth';

export function ProtectedRoute({ component: Component, ...props }) {
  const { user } = useAuth();

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
