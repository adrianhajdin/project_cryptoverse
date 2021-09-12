import React from 'react';
import { AiFillCaretRight } from 'react-icons/ai';
import millify from 'millify';
import { Collapse, Spin, Row, Col, Typography, Space } from 'antd';
import HTMLReactParser from 'html-react-parser';

import './exchanges.css';
import { useGetExchangesQuery } from '../../services/cryptoApi';

const { Title, Text } = Typography;

export const Exchanges = () => {
  const { Panel } = Collapse;
  const { data } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;
  if (!exchangesList?.length) {
    return (
      <div className="loading">
        <Spin />
      </div>
    );
  }

  return (
    <div className="exchanges-container">
      <Title level={2} style={{ marginTop: '50px', marginBottom: '30px' }}>All Crypto Exchanges</Title>

      <Row className="table-heading ">
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6} className="market-cap-title">Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      {exchangesList?.map((exchange) => (
        <Collapse bordered={false} expandIcon={({ isActive }) => <AiFillCaretRight rotate={isActive ? 90 : 0} />}>
          <Panel
            key={exchange.id}
            header={(
              <Row className="currency-card" key={exchange.id}>
                <Col span={6} className="currency-name-container ">
                  <span className="currency-rank">  {exchange.rank}.</span>
                  <img className="currency-image" src={exchange.iconUrl} />
                  <span className="curreny-name" style={{ marginLeft: '10px' }}>{exchange.name}</span>
                </Col>
                <Col span={6} className="currency-container">
                  <p className="currency-price">${exchange.volume && millify(exchange.volume)} </p>
                </Col>
                <Col span={6} className="currency-market-cap">{exchange.numberOfMarkets && millify(exchange.numberOfMarkets)}</Col>
                <Col span={6}>{exchange.marketShare && millify(exchange.marketShare)}%</Col>
              </Row>
            )}
          >
            {exchange.description && HTMLReactParser(exchange.description)}
          </Panel>
        </Collapse>
      ))}
    </div>
  );
};

