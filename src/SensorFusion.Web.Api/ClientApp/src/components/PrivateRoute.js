import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import {connect} from "react-redux";
import UserService from "../services/UserService";

const PrivateRoute = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.
  const savedUser = UserService.get();
  const isLoggedIn = savedUser && savedUser.token;

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
        )
      }
    />
  )
};

export default PrivateRoute;