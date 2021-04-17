import React from "react";
import {Login} from "../../routes/routes";
import {Route, Redirect} from "react-router-dom";

const ProtectedRoute = ({component: Component, isLogin, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin === true ? <Component {...props} /> : <Redirect to={Login} />
      }
    />
  );
};
export default ProtectedRoute;
