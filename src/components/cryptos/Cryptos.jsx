import React from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';

import './cryptos.css';

export const Cryptos = ({ data }) => {
  if (!data) {
    return (
      <div className="loading">
        loading...
      </div>
    );
  }

  return (
    <div className="cryptos-container">
      {data.map((currency) => (
        <Link key={currency.id} className="currency-grid-card" to={`/crypto/${currency.id}`}>
          <div className="currency-grid-desc">
            <p className="currency-grid-name">
              <span className="currency-grid-rank">  {currency.rank}.</span>
              <img className="currency-grid-image" src={currency.iconUrl} />
              <span className="curreny-grid-name">{currency.name}</span>
            </p>
            <p className="currency-price">${currency.price && millify(currency.price)} </p>
          </div>
          <div className="currency-grid-market">
            <p className="currency-grid-market-cap">${currency.marketCap && millify(currency.marketCap)}</p>
            <p>{currency.change}%</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
