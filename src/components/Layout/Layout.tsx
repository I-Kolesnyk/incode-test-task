import React, { FC, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastWrapper } from 'components/ToastContainer/ToastContainer';
import { Layout, Typography, Space } from 'antd';
const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const addClass = () => {
  const {pathname} = useLocation();
  if (pathname !== '/auth') {   
    return 'wide';
  }
};

const LayoutComponent: FC = () => {
  return (
    <Layout className={addClass()}>
      <Header>
        <Space.Compact direction="vertical">
          <Title level={2}>InCode</Title>
          <Paragraph>
            <p>Finance</p>
          </Paragraph>
        </Space.Compact>
      </Header>

      <Content>
        <Suspense fallback={<div>Loading</div>}>
          <Outlet />
        </Suspense>
      </Content>
      <ToastWrapper />
    </Layout>
  );
};

export default LayoutComponent;
