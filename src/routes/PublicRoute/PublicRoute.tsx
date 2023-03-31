import React, {  Fragment} from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'redux/auth/selectors';

type PublicRouteProps = {
  redirectTo: string;
  restricted?: boolean;
  children: JSX.Element | JSX.Element[];
};

const PublicRoute = (props: PublicRouteProps) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const shouldRedirect = isLoggedIn && props.restricted;

  return (
    <Fragment>
      {!shouldRedirect ? (
        props.children
      ) : (
        <Navigate to={props.redirectTo} replace={true} />
      )}
    </Fragment>
  );
};
export default PublicRoute;
