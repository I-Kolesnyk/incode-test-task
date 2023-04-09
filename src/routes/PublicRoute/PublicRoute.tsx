import React, {  Fragment} from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RouteProps } from 'types';
import { selectIsLoggedIn } from 'redux/auth/selectors';



const PublicRoute = (props: RouteProps) => {
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
