import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { useUserState } from 'common/hooks/useUser';

export function ProtectedRoute(props) {
  const user = useUserState();
  const { redirectAdminTo = null, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={renderProps => {
        if (!user) {
          return <Redirect to="/signin" />;
        }

        if (user.is_admin && redirectAdminTo !== null) {
          return <Redirect to={redirectAdminTo} />;
        }

        return <Component {...renderProps} />;
      }}
    />
  );
}

ProtectedRoute.propTypes = {
  redirectAdminTo: PropTypes.string,
  component: PropTypes.elementType.isRequired,
};
