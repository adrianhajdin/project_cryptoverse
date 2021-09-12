import React from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Spin, Typography } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, StarOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import './cryptoDetails.css';
import { useGetCryptoDetailsQuery } from '../../services/cryptoApi';

const { Title, Text } = Typography;

export const CryptoDetails = () => {
  const { coinId } = useParams();
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const cryptoDetails = data?.data?.coin;
  if (isFetching) {
    return (
      <div className="loading">
        <Spin />
      </div>
    );
  }

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {data?.data?.coin.name} ({data?.data?.coin.slug}) Price
        </Title>
        <p>{cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
      </Col>
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">{cryptoDetails.name} Value Statistics</Title>

            <Text>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</Text>
          </Col>
          <Col className="coin-stats">
            <Col className="coin-stats-name">
              <Text><DollarCircleOutlined /></Text>
              <Text>Price to USD</Text>
            </Col>
            <Text className="stats">$ {cryptoDetails.price && millify(cryptoDetails.price)}</Text>
          </Col>
          <Col className="coin-stats">
            <Col className="coin-stats-name">
              <Text><NumberOutlined /></Text>
              <Text>Rank</Text>
            </Col>
            <Text className="stats">{cryptoDetails.rank} </Text>
          </Col>
          <Col className="coin-stats">
            <Col className="coin-stats-name">
              <Text><ThunderboltOutlined /></Text>
              <Text>24h Volume</Text>
            </Col>
            <Text className="stats">$ {cryptoDetails.volume && millify(cryptoDetails.volume)}</Text>
          </Col>
          <Col className="coin-stats">
            <Col className="coin-stats-name">
              <Text><StarOutlined /></Text>
              <Text>Market Cap</Text>
            </Col>
            <Text className="stats">$ {cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}</Text>
          </Col>
          <Col className="coin-stats">
            <Col className="coin-stats-name">
              <Text><TrophyOutlined /></Text>
              <Text>All-time-high(daily avg.)</Text>
            </Col>
            <Text className="stats">$ {cryptoDetails.allTimeHigh.price && millify(cryptoDetails.allTimeHigh.price)}</Text>
          </Col>
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">Other Stats Info</Title>

            <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          <Col className="coin-stats">
            <Col className="coin-stats-name">
              <Text>
                <FundOutlined />
              </Text>
              <Text>Number Of Markets</Text>
            </Col>
            <Text className="stats">{cryptoDetails.numberOfMarkets} </Text>
          </Col>
          <Col className="coin-stats">
            <Col className="coin-stats-name">
              <Text><MoneyCollectOutlined /></Text>
              <Text>Number Of Exchanges</Text>
            </Col>
            <Text className="stats">{cryptoDetails.numberOfExchanges} </Text>
          </Col>

          <Col className="coin-stats">
            <Col className="coin-stats-name">
              <Text><ExclamationCircleOutlined /></Text>
              <Text>Aprroved Supply</Text>
            </Col>
            <Text className="stats">{cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />}</Text>
          </Col>
          <Col className="coin-stats">
            <Col className="coin-stats-name">
              <Text><ExclamationCircleOutlined /></Text>
              <Text>Total Supply</Text>
            </Col>
            <Text className="stats">$ {cryptoDetails.totalSupply && millify(cryptoDetails.totalSupply)}</Text>
          </Col>
          <Col className="coin-stats">
            <Col className="coin-stats-name">
              <Text><ExclamationCircleOutlined /></Text>
              <Text>Circulating Supply</Text>
            </Col>
            <Text className="stats">$ {cryptoDetails.circulatingSupply && millify(cryptoDetails.circulatingSupply)}</Text>
          </Col>
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">What is {cryptoDetails.name}?</Title>

          {cryptoDetails.description && HTMLReactParser(cryptoDetails.description)}
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">{cryptoDetails.name} Links</Title>
          { cryptoDetails.links?.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">{link.type}</Title>
              <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};
