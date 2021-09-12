import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Select, Spin } from 'antd';
import moment from 'moment';

import './news.css';
import { useGetCryptosQuery } from '../../services/cryptoApi';
import { useGetCryptoNewsQuery } from '../../services/cryptoNewsApi';

const demoImage = 'https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F3eeb15d1-a70f-45cd-a02a-f4a21bf36674.png?fit=scale-down&source=next&width=700';

export const News = () => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: 12 });

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
        <h1>Latest {newsCategory } News</h1>
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
      <div className="news-container">
        {cryptoNews.value.map((news) => (
          <div key={uuid()} className="news-card-container">
            <a href={news.url} target="_blank" className="news-card" rel="noreferrer">
              <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="" />
              <div className="news-desc">
                <h4>{news.name}</h4>
                <div className="provider-info">
                  <img src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                  <p className="provider-name">{news.provider[0]?.name}</p>
                  <p>{moment(news.datePublished).startOf('ss').fromNow()}</p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
