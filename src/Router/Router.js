import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from '../Components/Login';
import SignUp from '../Components/SignUp';
import Home from '../Components/Home';
import { AuthContext } from '../Context/globalAuth';

const Router = () => {
  return (
    <React.Fragment>
      <PrivateRoute exact path='/' component={Home} />
      <Route path='/login' component={Login} />
      <Route path='/signUp' component={SignUp} />
    </React.Fragment>
  );
};

export default Router;
