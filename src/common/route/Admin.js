import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../Auth';

export default function AdminRoute({ component: Component, ...props }) {
  const [user] = useContext(AuthContext);

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
