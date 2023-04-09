import React, { Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RouteProps } from 'types';
import { selectIsLoggedIn } from 'redux/auth/selectors';

const PrivateRoute = (props: RouteProps) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Fragment>
      {isLoggedIn ? (
        props.children
      ) : (
        <Navigate to={props.redirectTo} replace={true} />
      )}
    </Fragment>
  );
};

export default PrivateRoute;
