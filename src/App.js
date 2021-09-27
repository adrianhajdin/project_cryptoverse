import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

// Custom styles
import './App.css';

// Components
import {
  Navbar,
  Exchanges,
  Homepage,
  Cryptocurrencies,
  News,
  CryptoDetails,
  Footer,
} from './components';

// Routes
const routes = [
  { path: '/', name: 'Homepage', Component: Homepage },
  { path: '/exchanges', name: 'Exchanges', Component: Exchanges },
  {
    path: '/cryptocurrencies',
    name: 'Cryptocurrencies',
    Component: Cryptocurrencies,
  },
  {
    path: '/crypto/:coinId',
    name: 'CryptoDetails',
    Component: CryptoDetails,
  },
  {
    path: '/news',
    name: 'News',
    Component: News,
  },
];

const App = () => (
  <div className="app">
    <div className="navbar">
      <Navbar />
    </div>
    <div className="main">
      <Layout>
        <div className="routes">
          <Switch>
            {routes.map(({ path, Component }) => (
              <Route key={path} exact path={path}>
                <Component />
              </Route>
            ))}
          </Switch>
        </div>
      </Layout>
      <Footer />
    </div>
  </div>
);

export default App;
