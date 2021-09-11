import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Select, Button } from 'antd';
import 'antd/dist/antd.css';

import moment from 'moment';
import { getAllCryptosNews, loadMoreCryptosNews, useCryptoNewsListSelector } from './newsSlice';
import { useCryptoListSelector, getAllCryptos } from '../cryptos/cryptosSlice';

import './news.css';

export const News = () => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { cryptoNews, totalResult, page } = useCryptoNewsListSelector();
  const { cryptosList } = useCryptoListSelector();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCryptosNews({ newsCategory, count: 12 }));
    dispatch(getAllCryptos({ number: 100 }));
  }, [newsCategory]);
  const handleClick = () => {
    dispatch(loadMoreCryptosNews(
      { newsCategory, result: (page * 12),
      },
    ));
  };

  const { Option } = Select;

  const onChange = (value) => {
    setNewsCategory(value);
  };

  return (
    <div className="container">
      <div className="news-header">
        <h1>Latest {newsCategory } News</h1>
        <Select
          showSearch
          style={{ width: 180 }}
          placeholder="Select a Crypto"
          optionFilterProp="children"
          onChange={onChange}
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >

          <Option value="Cryptocurency">Cryptocurrency</Option>
          {
     cryptosList?.coins?.map((currency) => (

       <Option value={currency.name}>{currency.name}</Option>
     ))
   }
        </Select>,
      </div>
      <div className="news-container">
        {
         cryptoNews?.value ? (
           cryptoNews.value.map((news) => (
             <div key={uuid()}>
               <a href={news.url} target="_blank" className="news-card" rel="noreferrer">
                 <img
                   src={news?.image?.thumbnail?.contentUrl
                || 'https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F3eeb15d1-a70f-45cd-a02a-f4a21bf36674.png?fit=scale-down&source=next&width=700'}
                   alt=""
                 />
                 <div className="provider-info">
                   <img
                     src={news.provider[0]?.image?.thumbnail?.contentUrl
                  || 'https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F3eeb15d1-a70f-45cd-a02a-f4a21bf36674.png?fit=scale-down&source=next&width=700'}
                     alt=""
                   />

                   <p className="provider-name">{news.provider[0]?.name}</p>
                   <p>{
                moment(news.datePublished)
                  .startOf('ss')
                  .fromNow()
                         }
                   </p>
                 </div>
                 <h4>{news.name}</h4>

               </a>
             </div>

           ))
         ) : (
           <div>
             loading...
           </div>
         )
       }
      </div>
      <div className="load-more">
        {
                totalResult === cryptoNews?.value?.length ? ''
                  : (
                    <Button
                      onClick={handleClick}
                      className="load-more-btn"
                    >Load More
                    </Button>

                  )
            }
      </div>
    </div>

  );
};
