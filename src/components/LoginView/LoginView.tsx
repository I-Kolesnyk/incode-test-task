import React, { FC } from 'react';
import LoginForm from 'components/LoginForm';

type LoginViewProps = {
  setIsNewUser: (active: boolean) => void;
};

const LoginView: FC<LoginViewProps> = ({ setIsNewUser }) => {
  const handleRegistration = () => {
    setIsNewUser(true);
  };

  return (
    <>
      <h1>Sign in</h1>
      <div>
        <LoginForm />
        <p>Don’t have account yet? </p>
        <button onClick={handleRegistration}>New Account</button>
      </div>
    </>
  );
};

export default LoginView;
