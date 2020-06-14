import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../Context/globalAuth';

const SuperRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        currentUser.userUid === 'Al6mcI4K9QW7pTP85AbqMjU9T7q1' ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
};

export default SuperRoute;
