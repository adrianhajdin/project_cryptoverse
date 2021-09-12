import React from 'react';
import millify from 'millify';

import './style.css';
import { useGetMarketsQuery } from '../../services/cryptoApi';

export const Markets = () => {
  const { data: marketsList } = useGetMarketsQuery();

  if (!marketsList?.data?.markets?.length) {
    return (
      <div className="loading">
        loading...
      </div>
    );
  }

  return (
    <div className="exchanges-container">
      <div>
        <h2 className="home-heading">Top Crypto Markets</h2>
      </div>
      <div className="table-heading ">
        <p>Markets</p>
        <p>24h Trade Volume</p>
        <p className="market-cap-title">Price</p>
        <p>Market Share</p>
      </div>
      {marketsList?.data?.markets.map((exchange) => (
        <div key={exchange.id}>
          <div className="currency-card">
            <p className="currency-name-container ">
              <span className="currency-rank">{exchange.rank}.</span>
              <img className="currency-image" src={exchange.sourceIconUrl} />
              <span className="curreny-name">{exchange.baseSymbol}/{exchange.quoteSymbol}</span>
            </p>
            <div className="currency-container">
              <p className="currency-price">${millify(exchange.volume)}</p>
            </div>
            <p className="currency-market-cap">${millify(exchange.price)}</p>
            <p>{millify(exchange.marketShare)}%</p>
          </div>
        </div>
      ))}
    </div>
  );
};
