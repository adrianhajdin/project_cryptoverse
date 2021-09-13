import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input, Result } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { Loader } from './Loader';

export const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);
    const filteredData = cryptosList?.data?.coins.filter(
      (item) => item.name.toLowerCase().includes(searchTerm),
  );
  setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <>
      {
      !simplified && (
        <div style={{ margin: '20px auto 30px auto', width: '250px' }}>
          <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} />

        </div>
      )
    }
      <Row gutter={[32, 32]} style={{ minHeight: '65vh' }}>
        {cryptos?.length ? (
          <>
            { cryptos?.map((currency) => (
              <Col xs={24} sm={12} lg={6} style={{ minWidth: '250px' }} key={currency.id}>
                <Link key={currency.id} to={`/crypto/${currency.id}`}>
                  <Card title={`${currency.rank}. ${currency.name}`} extra={<img style={{ width: '35px' }} src={currency.iconUrl} />} hoverable>
                    <p>Price: {millify(currency.price)}</p>
                    <p>Market Cap: {millify(currency.marketCap)}</p>
                    <p>Daily Change: {currency.change}%</p>
                  </Card>
                </Link>
              </Col>
        ))}
          </>
        ) : (
          <Result
            status="404"
            title="Oops! Search Something Else."
            subTitle="Sorry, This cryptocurrency didn't exist."
          />
        )}
      </Row>
    </>
  );
};
