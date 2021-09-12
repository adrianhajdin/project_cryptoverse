import React from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { Loader } from './Loader';

export const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList } = useGetCryptosQuery(count);

  if (!cryptosList?.data?.coins?.length) return <Loader />;

  return (
    <>
      <Row gutter={[32, 32]}>
        {cryptosList.data.coins.map((currency) => (
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
    </>
  );
};
