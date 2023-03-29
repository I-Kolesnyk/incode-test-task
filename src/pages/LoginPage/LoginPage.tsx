import React from 'react';
import { Link } from 'react-router-dom';

import LoginForm from 'components/LoginForm';


const LoginPage = () => {
  return (
    <>
      <h1>Sign in</h1>
      <div>
        <LoginForm/>
        <p>Don’t have account yet? </p>
        <Link to='/registration'>New Account</Link>
      </div>
    </>
  );
};

export default LoginPage;