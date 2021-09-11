import { configureStore } from '@reduxjs/toolkit';
import cryptosListReducer from '../components/cryptos/cryptosSlice';
import cryptoNewsReducer from '../components/news/newsSlice';
import exchangesReducer from '../components/exchanges/exchangesSlice';
import marketsReducer from '../components/markets/marketsSlice';
import cryptoDetailsReducer from '../components/cryptoDetails/cryptoDetailsSlice';

export const store = configureStore({
  reducer: {
    cryptosList: cryptosListReducer,
    cryptoNews: cryptoNewsReducer,
    exchangesList: exchangesReducer,
    marketsList: marketsReducer,
    cryptoDetails: cryptoDetailsReducer,
  },
});
