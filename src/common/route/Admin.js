import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { useUserState } from 'common/hooks/useUser';

export function AdminRoute({ component: Component, ...rest }) {
  const user = useUserState();

  return (
    <Route
      {...rest}
      render={renderProps => {
        if (!user) {
          return <Redirect to="/signin" />;
        }

        if (!user.is_admin) {
          return <Redirect to="/403" />;
        }

        return <Component {...renderProps} />;
      }}
    />
  );
}

AdminRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};
