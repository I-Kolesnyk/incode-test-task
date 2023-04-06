import React, { FC } from 'react';
import { useAppDispatch } from 'redux/store';
import { setIsNewUser } from 'redux/auth/slice';
import LoginForm from 'components/LoginForm';
import { Typography, Button, Space } from 'antd';
const { Title, Paragraph } = Typography;

const LoginView :FC = () => {
  const dispatch = useAppDispatch();

  const handleRegistration = () => {
    dispatch(setIsNewUser(true))
  };

  return (
    <>
      <Title level={1}>Sign in</Title>
      <LoginForm />
      <Space align={'center'} direction={'horizontal'}>
        <Paragraph>
          <p>Don’t have account yet?</p>
        </Paragraph>
        <Button type="link" block onClick={handleRegistration}>
          New Account
        </Button>
      </Space>
    </>
  );
};

export default LoginView;
