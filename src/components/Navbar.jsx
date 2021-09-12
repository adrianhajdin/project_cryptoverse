
import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined } from '@ant-design/icons';

export const Navbar = () => (
  <Menu theme="dark">
    <Menu.Item icon={<HomeOutlined />}>
      <Link to="/">Home</Link>
    </Menu.Item>
    <Menu.Item icon={<FundOutlined />}>
      <Link to="/cryptocurrencies">Cryptocurrencies</Link>
    </Menu.Item>
    <Menu.Item icon={<MoneyCollectOutlined />}>
      <Link to="/exchanges">Exchanges</Link>
    </Menu.Item>
    <Menu.Item icon={<BulbOutlined />}>
      <Link to="/news">News</Link>
    </Menu.Item>
  </Menu>
);

