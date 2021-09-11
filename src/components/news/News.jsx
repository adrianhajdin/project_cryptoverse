import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Select, Button } from 'antd';
import moment from 'moment';

import { getAllCryptosNews, loadMoreCryptosNews, useCryptoNewsListSelector } from './newsSlice';
import { useCryptoListSelector, getAllCryptos } from '../cryptos/cryptosSlice';

import './news.css';

const demoImage = 'https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F3eeb15d1-a70f-45cd-a02a-f4a21bf36674.png?fit=scale-down&source=next&width=700';

export const News = () => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { cryptoNews, totalResult, page } = useCryptoNewsListSelector();
  const { cryptosList } = useCryptoListSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCryptosNews({ newsCategory, count: 12 }));
    dispatch(getAllCryptos({ number: 100 }));
  }, [newsCategory]);

  const { Option } = Select;

  if (!cryptoNews?.value) {
    return (
      <div className="loading">
        loading...
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
          {cryptosList?.coins?.map((currency) => (
            <Option value={currency.name}>{currency.name}</Option>
          ))}
        </Select>,
      </div>
      <div className="news-container">
        {cryptoNews.value.map((news) => (
          <div key={uuid()}>
            <a href={news.url} target="_blank" className="news-card" rel="noreferrer">
              <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="" />
              <div className="provider-info">
                <img src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                <p className="provider-name">{news.provider[0]?.name}</p>
                <p>{moment(news.datePublished).startOf('ss').fromNow()}</p>
              </div>
              <h4>{news.name}</h4>
            </a>
          </div>
        ))}
      </div>
      <div className="load-more">
        {totalResult === cryptoNews?.value?.length ? '' : (
          <Button onClick={() => dispatch(loadMoreCryptosNews({ newsCategory, result: (page * 12) }))} className="load-more-btn">
            Load More
          </Button>
        )}
      </div>
    </div>

  );
};
