import React, { FC } from 'react';
import RegisterForm from 'components/RegisterForm';

const RegistrationView: FC = () => {
  return (
    <>
      <h1>Sign up</h1>
      <div>
        <RegisterForm />
      </div>
    </>
  );
};

export default RegistrationView;
