import React from 'react';
import millify from 'millify';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import { Spin, Typography, Row, Col, Space, Card } from 'antd';

import { Cryptos } from '../cryptos/Cryptos';
import './home.css';
import { useGetCryptosQuery } from '../../services/cryptoApi';
import { useGetCryptoNewsQuery } from '../../services/cryptoNewsApi';
import { NewsCard } from '../news/NewsCard';

const demoImage = 'https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F3eeb15d1-a70f-45cd-a02a-f4a21bf36674.png?fit=scale-down&source=next&width=700';

export const Home = () => {
  const { Title, Text } = Typography;
  const { data, isFetching } = useGetCryptosQuery(10);
  const { data: cryptoNews, isFetching: loadingNews } = useGetCryptoNewsQuery({ newsCategory: 'cryptocurrency', count: 6 });
  const cryptosList = data?.data?.coins;
  const globalStats = data?.data?.stats;

  if (isFetching || loadingNews) {
    return (
      <div className="loading">
        <Spin />
      </div>
    );
  }
  return (
    <Row className="home-container">
      <Title level={2} style={{ marginTop: '50px', marginBottom: '30px' }}>Global Crypto Stats</Title>
      <Row gutter={[32, 32]} className="global-stats">
        <Col>
          <Card title={`Total Cryptocurrencies: ${globalStats.total}`} hoverable />
        </Col>
        <Col>
          <Card title={`Total Exchanges: ${millify(globalStats.totalExchanges)}`} hoverable />
        </Col>
        <Col>
          <Card title={`Total Market Cap: $ ${millify(globalStats.totalMarketCap)}`} hoverable />
        </Col>
        <Col>
          <Card title={`Total 24h Volume: $ ${millify(globalStats.total24hVolume)}`} hoverable />
        </Col>
        <Col>
          <Card title={`Total Markets: ${millify(globalStats.totalMarkets)}`} hoverable />
        </Col>
      </Row>
      <Row style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Title level={2} style={{ marginTop: '50px', marginBottom: '30px' }}>Top 10 Cryptos In The World</Title>
        <Link className="show-more" to="/cryptos">Show more</Link>
      </Row>
      <Cryptos data={cryptosList} />
      <Row style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Title level={2} style={{ marginTop: '50px', marginBottom: '30px' }}>Latest Crypto News</Title>
        <Link className="show-more" to="/news">Show more</Link>
      </Row>

      <Space style={{ flexWrap: 'wrap' }}>
        {cryptoNews?.value?.map((news) => (
          <NewsCard news={news} key={uuid()} />
        ))}
      </Space>
    </Row>
  );
};
