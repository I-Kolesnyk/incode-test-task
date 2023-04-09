import React, { FC, useCallback } from 'react';
import { Typography, Button } from 'antd';
import Icon from '@ant-design/icons';
import { DecorIcon } from 'images/DecorIcon';
import { useAppDispatch } from 'hooks';
import { userSignOut } from 'redux/auth/operations';

const { Title, Paragraph } = Typography;

const HomePage: FC = () => {
  const dispatch = useAppDispatch();

  const handleSignOut = useCallback(() => dispatch(userSignOut()), [dispatch]);

  return (
    <>
      <Title level={1}>
        Congratulations <Icon component={DecorIcon} height={188} width={237} />
      </Title>

      <Paragraph>
        <p>
          Now you are on the main page. Soon we will provide you with detailed
          feedback on the result of your work
        </p>
      </Paragraph>
      <Button onClick={handleSignOut}>Log Out</Button>
    </>
  );
};

export default HomePage;
