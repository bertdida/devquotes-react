import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from 'common/useAuth';

export function AdminRoute({ component: Component, ...props }) {
  const { user } = useAuth();

  return (
    <Route
      {...props}
      render={_props => {
        if (!user) {
          return <Redirect to="/signin" />;
        }

        if (!user.is_admin) {
          return <Redirect to="/403" />;
        }

        return <Component {..._props} />;
      }}
    />
  );
}

AdminRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};
