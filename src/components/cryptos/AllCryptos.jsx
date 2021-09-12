import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import millify from 'millify';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { useGetCryptosQuery } from '../../services/cryptoApi';

export const AllCryptos = () => {
  const { data: cryptosList } = useGetCryptosQuery(100);

  if (!cryptosList?.data?.coins.length) {
    return (
      <div className="loading">
        <Spin />
      </div>
    );
  }

  return (
    <div>
      {cryptosList?.data?.coins?.map((coin) => (
        <div key={coin.id}>
          <div className="currency-card">
            <p className="currency-name-container ">
              <span className="currency-rank">  {coin.rank}.</span>
              <img className="currency-image" src={coin.iconUrl} />
              <span className="curreny-name">{coin.name}</span>
            </p>
            <p className="currency-market-cap">$ {coin.price && millify(coin.price)}</p>
            <p>${coin.marketCap && millify(coin.marketCap)}</p>
            <p>{coin.change}%</p>
          </div>
        </div>
      ))}
      <div className="load-more">
        {cryptosList?.coins?.length === 100 ? '' : (
          <Button onClick={() => dispatch(loadMoreCryptos(cryptosPage))} className="load-more-btn">
            Load More
          </Button>
        )}
      </div>
    </div>
  );
};
