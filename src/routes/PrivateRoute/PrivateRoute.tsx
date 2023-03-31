import React, { Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'redux/auth/selectors';

type PrivateRouteProps = {
  redirectTo: string;
  restricted?: boolean;
  children?: JSX.Element | JSX.Element[];
};

const PrivateRoute = (props: PrivateRouteProps) => {
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
