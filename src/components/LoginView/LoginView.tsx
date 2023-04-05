import React, { FC } from 'react';
import LoginForm from 'components/LoginForm';
import { Typography, Button, Space } from 'antd';
const { Title, Paragraph } = Typography;

type LoginViewProps = {
  setIsNewUser: (active: boolean) => void;
};

const LoginView: FC<LoginViewProps> = ({ setIsNewUser }) => {
  const handleRegistration = () => {
    setIsNewUser(true);
  };

  return (
    <>
      <Title level={1}>
        Sign in
      </Title>
      <LoginForm />
      <Space align={'center'} direction={'horizontal'}>
        <Paragraph><p>Don’t have account yet?</p></Paragraph>
        <Button
          type="link"
          block
          onClick={handleRegistration}          
        >
          New Account
        </Button>
      </Space>
    </>
  );
};

export default LoginView;
