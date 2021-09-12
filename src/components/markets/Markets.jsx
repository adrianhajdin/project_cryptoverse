import React from 'react';
import millify from 'millify';
import { Spin, Table, Typography } from 'antd';

import { useGetMarketsQuery } from '../../services/cryptoApi';

export const Markets = () => {
  const { data: marketsList, isFetching } = useGetMarketsQuery();
  const { Text, Title } = Typography;

  if (isFetching) {
    return (
      <div className="loading">
        <Spin />
      </div>
    );
  }

  const columns = [
    {
      title: 'Markets',
      dataIndex: 'sourceIconUrl',
      render: (sourceIconUrl) => <p> <img style={{ width: '30px', height: '30px' }} src={sourceIconUrl} /></p>,
    },
    {
      title: '24h Trade Volume',
      dataIndex: 'volume',
      render: (volume) => <Text>$ {millify(volume)}</Text>,
      sorter: {
        compare: (a, b) => a.volume - b.volume,
        multiple: 3,
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (price) => <Text>$ {millify(price)}</Text>,
      sorter: {
        compare: (a, b) => a.price - b.price,
        multiple: 2,
      },
    },
    {
      title: 'Market Share',
      dataIndex: 'marketShare',
      render: (marketShare) => <Text>$ {millify(marketShare)}</Text>,
      sorter: {
        compare: (a, b) => a.marketShare - b.marketShare,
        multiple: 1,
      },
    },
  ];
  // function onChange(pagination, filters, sorter, extra) {
  //   console.log('params', pagination, filters, sorter, extra);
  // }
  return (
    <>
      <Title level={2} style={{ marginTop: '50px', marginBottom: '30px' }}>Top Crypto Markets</Title>
      <Table columns={columns} dataSource={marketsList?.data?.markets} />
    </>
  );
};
