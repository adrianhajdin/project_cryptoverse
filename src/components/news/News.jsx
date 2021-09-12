import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Select, Spin, Typography, Row, Col, Space } from 'antd';
import moment from 'moment';

import './news.css';
import { useGetCryptosQuery } from '../../services/cryptoApi';
import { useGetCryptoNewsQuery } from '../../services/cryptoNewsApi';
import { NewsCard } from './NewsCard';

const demoImage = 'https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F3eeb15d1-a70f-45cd-a02a-f4a21bf36674.png?fit=scale-down&source=next&width=700';

export const News = () => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: 12 });
  const { Title } = Typography;
  const { Option } = Select;

  if (!cryptoNews?.value) {
    return (
      <div className="loading">
        <Spin />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="news-header">
        <Title level={2} style={{ marginTop: '50px', marginBottom: '30px' }}>Latest {newsCategory} News</Title>

        <Select
          showSearch
          style={{ width: 180 }}
          placeholder="Select a Crypto"
          optionFilterProp="children"
          onChange={(value) => setNewsCategory(value)}
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          <Option value="Cryptocurency">Cryptocurrency</Option>
          {data?.data?.coins?.map((currency) => (
            <Option value={currency.name}>{currency.name}</Option>
          ))}
        </Select>,
      </div>
      <Space style={{ flexWrap: 'wrap' }}>
        {cryptoNews.value.map((news) => (
          <NewsCard news={news} key={uuid()} />
        ))}
      </Space>
    </div>
  );
};
