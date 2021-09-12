import React from 'react';
import { Spin, Typography } from 'antd';

import { useGetCryptosQuery } from '../../services/cryptoApi';
import { Cryptos } from './Cryptos';

export const AllCryptos = () => {
  const { data: cryptosList, isFetching } = useGetCryptosQuery(100);
  const { Title } = Typography;
  if (isFetching) {
    return (
      <div className="loading">
        <Spin />
      </div>
    );
  }

  return (
    <div>
      <Title level={2} style={{ marginTop: '50px', marginBottom: '30px' }}>All cryptocurrency prices</Title>

      <Cryptos data={cryptosList?.data?.coins} />
    </div>
  );
};
