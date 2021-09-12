import React from 'react';
import { AiFillCaretRight } from 'react-icons/ai';
import millify from 'millify';
import { Collapse } from 'antd';
import HTMLReactParser from 'html-react-parser';

import './exchanges.css';
import { useGetExchangesQuery } from '../../services/cryptoApi';

export const Exchanges = () => {
  const { Panel } = Collapse;
  const { data } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;
  if (!exchangesList?.length) {
    return (
      <div className="loading">
        loading...
      </div>
    );
  }

  return (
    <div className="exchanges-container">
      <div>
        <h2 className="home-heading">Top Crypto Exchanges</h2>
      </div>
      <div className="table-heading ">
        <p>Exchanges</p>
        <p>24h Trade Volume</p>
        <p className="market-cap-title">Markets</p>
        <p>Change</p>
      </div>
      {exchangesList?.map((exchange) => (
        <Collapse bordered={false} expandIcon={({ isActive }) => <AiFillCaretRight rotate={isActive ? 90 : 0} />}>
          <Panel
            key={exchange.id}
            header={(
              <div key={exchange.id}>
                <div className="currency-card">
                  <p className="currency-name-container ">
                    <span className="currency-rank">  {exchange.rank}.</span>
                    <img className="currency-image" src={exchange.iconUrl} />
                    <span className="curreny-name">{exchange.name}</span>
                  </p>
                  <div className="currency-container">
                    <p className="currency-price">${exchange.volume && millify(exchange.volume)} </p>
                  </div>
                  <p className="currency-market-cap">{exchange.numberOfMarkets && millify(exchange.numberOfMarkets)}</p>
                  <p>{exchange.marketShare && millify(exchange.marketShare)}%</p>
                </div>
              </div>
            )}
          >
            {exchange.description && HTMLReactParser(exchange.description)}
          </Panel>
        </Collapse>
      ))}
    </div>
  );
};
