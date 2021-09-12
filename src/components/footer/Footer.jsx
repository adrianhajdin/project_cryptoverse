import React from 'react';
import { Link } from 'react-router-dom';
import { Space, Typography } from 'antd';

import './footer.css';

export const Footer = () => {
  const { Title } = Typography;
  return (
    <div className="footer">
      <>
        <Title level={5}>Copyright © 2021 <Link to="/">Cryptoverse Inc.</Link> All Rights Reserved.</Title>
      </>
      <Space>
        <Link to="/">Home</Link>
        <Link to="/exchanges">Exchanges</Link>
        <Link to="/news">News</Link>
      </Space>
    </div>
  );
};

