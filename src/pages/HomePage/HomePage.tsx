import React, { FC, useCallback } from 'react';
import { Typography, Button } from 'antd';
import Icon from '@ant-design/icons';
import { DecorIcon } from 'components/icons';
import { useAppDispatch } from 'redux/store';
import { userSignOut } from 'redux/auth/operations';
import homePageImage from 'images/homePageImage.png';

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
      <img
        src={homePageImage}
        alt="meeting"
        width="341"
        height="288"
        className="home_image"
      />
    </>
  );
};

export default HomePage;
