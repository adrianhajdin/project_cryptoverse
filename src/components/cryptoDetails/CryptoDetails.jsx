import React from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { RiPriceTagLine } from 'react-icons/ri';
import { SiSourcegraph, SiMarketo } from 'react-icons/si';
import { GiBoltDrop } from 'react-icons/gi';
import { TiWavesOutline } from 'react-icons/ti';
import { FcCurrencyExchange } from 'react-icons/fc';
import { BiMedal } from 'react-icons/bi';
import { GoVerified } from 'react-icons/go';
import { BsInfoCircle } from 'react-icons/bs';
import { CgDanger } from 'react-icons/cg';
import { Spin } from 'antd';

import './cryptoDetails.css';
import { useGetCryptoDetailsQuery } from '../../services/cryptoApi';

export const CryptoDetails = () => {
  const { coinId } = useParams();
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const cryptoDetails = data?.data?.coin;
  if (isFetching) {
    return (
      <div className="loading">
        <Spin />
      </div>
    );
  }

  return (
    <div className="coin-detail-container">
      <div className="coin-heading-container">
        <div className="coin-name">
          {data?.data?.coin.name} ({data?.data?.coin.slug}) Price
        </div>
        <p>{cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
      </div>
      <div className="stats-container">
        <div className="coin-value-statistics">
          <div className="coin-value-statistics-heading">
            <h2>{cryptoDetails.name} value statistics</h2>
            <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </div>
          <div className="coin-stats">
            <div className="coin-stats-name">
              <p><RiPriceTagLine /></p>
              <p>Price to USD</p>
            </div>
            <p className="stats">$ {cryptoDetails.price && millify(cryptoDetails.price)}</p>
          </div>
          <div className="coin-stats">
            <div className="coin-stats-name">
              <p><SiSourcegraph /></p>
              <p>Rank</p>
            </div>
            <p className="stats">{cryptoDetails.rank} </p>
          </div>
          <div className="coin-stats">
            <div className="coin-stats-name">
              <p><GiBoltDrop /></p>
              <p>24h Volume</p>
            </div>
            <p className="stats">$ {cryptoDetails.volume && millify(cryptoDetails.volume)}</p>
          </div>
          <div className="coin-stats">
            <div className="coin-stats-name">
              <p><TiWavesOutline /></p>
              <p>Market Cap</p>
            </div>
            <p className="stats">$ {cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}</p>
          </div>
          <div className="coin-stats">
            <div className="coin-stats-name">
              <p><BiMedal /></p>
              <p>All-time-high(daily avg.)</p>
            </div>
            <p className="stats">$ {cryptoDetails.allTimeHigh.price && millify(cryptoDetails.allTimeHigh.price)}</p>
          </div>
        </div>
        <div className="other-stats-info">
          <div className="coin-value-statistics-heading">
            <h2>Other Stats Info</h2>
            <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </div>
          <div className="coin-stats">
            <div className="coin-stats-name">
              <p><SiMarketo /></p>
              <p>Number Of Markets</p>
            </div>
            <p className="stats">{cryptoDetails.numberOfMarkets} </p>
          </div>
          <div className="coin-stats">
            <div className="coin-stats-name">
              <p><FcCurrencyExchange /></p>
              <p>Number Of Exchanges</p>
            </div>
            <p className="stats"> {cryptoDetails.numberOfExchanges}</p>
          </div>
          <div className="coin-stats">
            <div className="coin-stats-name">
              <p><BsInfoCircle /></p>
              <p>Aprroved Supply</p>
            </div>
            <p className="stats">{cryptoDetails.approvedSupply ? <GoVerified /> : <CgDanger />}</p>
          </div>
          <div className="coin-stats">
            <div className="coin-stats-name">
              <p><BsInfoCircle /></p>
              <p>Total Supply</p>
            </div>
            <p className="stats">$ {cryptoDetails.totalSupply && millify(cryptoDetails.totalSupply)}</p>
          </div>
          <div className="coin-stats">
            <div className="coin-stats-name">
              <p><BsInfoCircle /></p>
              <p>Circulating Supply</p>
            </div>
            <p className="stats">$ {cryptoDetails.circulatingSupply && millify(cryptoDetails.circulatingSupply)}</p>
          </div>
        </div>
      </div>
      <div className="coin-desc-link">
        <div className="coin-desc">
          <h2>What is {cryptoDetails.name}?</h2>
          {cryptoDetails.description && HTMLReactParser(cryptoDetails.description)}
        </div>
        <div className="coin-links">
          <h2>{cryptoDetails.name} Links</h2>
          { cryptoDetails.links?.map((link) => (
            <div className="coin-link" key={link.name}>
              <p className="link-name">{link.type}</p>
              <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
