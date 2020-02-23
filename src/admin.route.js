import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "./components/Auth";

export const AdminRoute = ({ component: Component, ...rest }) => {
  const [user] = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props => {
        if (!user) {
          return <Redirect to="/signin" />;
        }

        if (!user.is_admin) {
          return <Redirect to="/403" />;
        }

        return <Component {...props} />;
      }}
    />
  );
};
