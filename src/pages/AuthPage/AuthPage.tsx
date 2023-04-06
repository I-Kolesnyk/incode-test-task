import React, {FC} from 'react';
import { useAppSelector } from 'redux/store';
import { selectIsNewUser } from 'redux/auth/selectors';
import LoginView from 'components/LoginView';
import RegistrationView from 'components/RegistrationView';

const AuthPage : FC = () => {

  const isNewUser = useAppSelector(selectIsNewUser);
 
  return (
    <>
    {isNewUser ? <RegistrationView/> : <LoginView/> }      
    </>
  );
};

export default AuthPage;
