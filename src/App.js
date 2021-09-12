import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Avatar, Space } from 'antd';

import { Exchanges, Homepage, News, Cryptocurrencies, CryptoDetails, Navbar } from './components';
import icon from './cryptocurrency.png';
import './App.css';

const App = () => (
  <Layout>
    <div style={{ backgroundColor: '#001529', display: 'flex', padding: '20px', alignItems: 'center' }}>
      <Avatar src={icon} size="large" />
      <Typography.Title level={2} style={{ color: 'white', margin: '0 0 0 15px' }}>Cryptoverse</Typography.Title>
    </div>
    <Layout>
      <Layout.Sider theme="dark" breakpoint="lg">
        <Navbar />
      </Layout.Sider>
      <div style={{ padding: '30px' }}>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/exchanges">
            <Exchanges />
          </Route>
          <Route exact path="/cryptocurrencies">
            <Cryptocurrencies />
          </Route>
          <Route exact path="/crypto/:coinId">
            <CryptoDetails />
          </Route>
          <Route exact path="/news">
            <News />
          </Route>
        </Switch>
      </div>
    </Layout>
    <div style={{ backgroundColor: '#001529', display: 'flex', flexDirection: 'column', padding: '20px', alignItems: 'center' }}>
      <Typography.Title level={5} style={{ color: 'white' }}>Copyright © 2021 <Link to="/">Cryptoverse Inc.</Link> All Rights Reserved.</Typography.Title>
      <Space>
        <Link to="/">Home</Link>
        <Link to="/exchanges">Exchanges</Link>
        <Link to="/news">News</Link>
      </Space>
    </div>
  </Layout>
);

export default App;
