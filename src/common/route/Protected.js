import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from 'common/hooks/useAuth';

export function ProtectedRoute(props) {
  const { user } = useAuth();
  const { redirectAdminTo = null, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={_props => {
        if (!user) {
          return <Redirect to="/signin" />;
        }

        if (user.is_admin && redirectAdminTo !== null) {
          return <Redirect to={redirectAdminTo} />;
        }

        return <Component {..._props} />;
      }}
    />
  );
}

ProtectedRoute.propTypes = {
  redirectAdminTo: PropTypes.string,
  component: PropTypes.elementType.isRequired,
};
