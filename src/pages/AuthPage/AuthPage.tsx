import React, {FC, useState} from 'react';
import LoginView from 'components/LoginView';
import RegistrationView from 'components/RegistrationView';

const AuthPage : FC = () => {
  const [isNewUser, setIsNewUser] = useState<boolean>(false);

  return (
    <>
    {isNewUser ? <RegistrationView/> : <LoginView setIsNewUser = {setIsNewUser}/> }      
    </>
  );
};

export default AuthPage;
