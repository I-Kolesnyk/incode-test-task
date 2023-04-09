import React, { FC, Suspense } from 'react';
import { Outlet} from 'react-router-dom';
import { ToastWrapper } from 'components/ToastContainer/ToastContainer';
import { addClass } from 'utils';
import { Layout, Typography, Space } from 'antd';
const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;
import { ThreeDots } from  'react-loader-spinner'

const LayoutComponent: FC = () => {
  return (
    <>
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
        <Suspense fallback={ <ThreeDots />}>
          <Outlet />
        </Suspense>
      </Content>
    
    </Layout>
      <ToastWrapper />
      </>
  );
};

export default LayoutComponent;
