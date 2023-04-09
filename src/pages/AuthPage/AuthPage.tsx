import React, {FC} from 'react';
import { useNewUser } from 'hooks';
import LoginView from 'components/LoginView';
import RegistrationView from 'components/RegistrationView';

const AuthPage : FC = () => {

  const isNewUser = useNewUser();
 
  return (
    <>
    {isNewUser ? <RegistrationView/> : <LoginView/> }      
    </>
  );
};

export default AuthPage;
