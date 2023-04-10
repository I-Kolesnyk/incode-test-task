import React from 'react';
import { Link } from 'react-router-dom';
import { Typography} from 'antd';

const { Title, Paragraph } = Typography;

function NotFoundPage() {
  return (
    <>
      <Title level={1}>Page not found</Title>
      <Paragraph>
        <p>The exact URL you were looking for does not exist</p>
      </Paragraph>
      <Link to="/">Go to sign in</Link>
    </>
  );
}

export default NotFoundPage;
