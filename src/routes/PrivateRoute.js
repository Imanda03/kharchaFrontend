import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("access_token") ? (
        <Component {...props} />
      ) : (
        <Redirect
          push
          to={{
            pathname: "/login/",
            from: props.location,
            // state: { from: props.location },
          }}
        />
      )
    }
  />
);
export default PrivateRoute;
