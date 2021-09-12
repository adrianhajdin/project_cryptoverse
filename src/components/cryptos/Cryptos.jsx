import React from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'antd';

export const Cryptos = ({ data }) => {
  if (!data) {
    return (
      <div className="loading">
        loading...
      </div>
    );
  }

  return (
    <Row gutter={[32, 32]}>
      {data.map((currency) => (
        <Col xs={24} sm={12} lg={6}>
          <Link key={currency.id} to={`/crypto/${currency.id}`}>
            <Card title={`${currency.rank}. ${currency.name}`} extra={<img style={{ width: '35px' }} src={currency.iconUrl} />} hoverable>
              <p>Price: {millify(currency.price)}</p>
              <p>Market Cap: {millify(currency.marketCap)}</p>
              <p>Daily Change: {currency.change}%</p>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
};
