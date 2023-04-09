import React, { FC } from 'react';
import { useAppDispatch } from 'hooks';
import { setIsNewUser } from 'redux/auth/slice';
import { Typography, Button, Space } from 'antd';
const { Title, Paragraph } = Typography;

import RegisterForm from 'components/RegisterForm';

const RegistrationView: FC = () => {
  const dispatch = useAppDispatch();

  const handleSignIn = () => {
    dispatch(setIsNewUser(false))
  };

  return (
    <>
      <Title level={1}>Sign up</Title>      
        <RegisterForm />
        <Space align={'center'} direction={'horizontal'}>
        <Paragraph>
          <p>I have an account.</p>
        </Paragraph>
        <Button type="link" block onClick={handleSignIn}>
          Go to Sign in
        </Button>
      </Space>
    </>
  );
};

export default RegistrationView;
