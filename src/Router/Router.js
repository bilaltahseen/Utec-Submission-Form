import React from 'react';
import { Route } from 'react-router-dom';

import Login from '../Components/Login';
import SignUp from '../Components/SignUp';
import Home from '../Components/Home';

import PrivateRoute from './PrivateRoute';
import SuperUser from '../Components/SuperUser';
import SuperRoute from './SuperRoute';

import Page1 from '../Components/Page1';
import Page2 from '../Components/Page2';
import Page3 from '../Components/Page3';

const Router = () => {
  return (
    <React.Fragment>
      <PrivateRoute exact path='/' component={Home} />
      <PrivateRoute path='/page1' component={Page1} />
      <PrivateRoute path='/page2' component={Page2} />
      <PrivateRoute path='/page3' component={Page3} />

      <SuperRoute path='/admin' component={SuperUser} />
      <SuperRoute path='/signUp' component={SignUp} />

      <Route path='/login' component={Login} />
    </React.Fragment>
  );
};

export default Router;
