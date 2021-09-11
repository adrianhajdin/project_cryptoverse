import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import axios from 'axios';

export const getAllCryptosNews = createAsyncThunk(
  'cryptos/getAllCryptoNews',
  async ({ newsCategory, count }) => {
    const res = await axios.get('https://bing-news-search1.p.rapidapi.com/news/search', {
      params: {
        q: newsCategory,
        safeSearch: 'Off',
        textFormat: 'Raw',
        freshness: 'Day',
        count,
      },
      headers: {
        'x-bingapis-sdk': 'true',
        'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
        'x-rapidapi-key': '57c70944e9mshceb81b6f7fcf433p1beddbjsnf4a64a893c0a',
      },
    });

    return res.data;
  },
);
export const loadMoreCryptosNews = createAsyncThunk(
  'cryptos/loadMoreCryptoNews',
  async ({ newsCategory, result }) => {
    const res = await axios.get('https://bing-news-search1.p.rapidapi.com/news/search', {
      params: {
        q: newsCategory,
        safeSearch: 'Off',
        textFormat: 'Raw',
        freshness: 'Day',
        count: result,
      },
      headers: {
        'x-bingapis-sdk': 'true',
        'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
        'x-rapidapi-key': '57c70944e9mshceb81b6f7fcf433p1beddbjsnf4a64a893c0a',
      },
    });
    return res.data;
  },
);
export const cryptoNewsSlice = createSlice({
  name: 'cryptoNews',
  initialState: {
    cryptoNews: [],
    totalResult: 0,
    page: 2,
  },
  reducers: {},
  extraReducers: {
    [getAllCryptosNews.fulfilled]: (state, action) => {
      state.cryptoNews = action.payload;
      state.totalResult = action.payload.totalEstimatedMatches;
    },
    [getAllCryptosNews.rejected]: (state, action) => {
      // eslint-disable-next-line
      console.log(action.error.message);
    },
    [loadMoreCryptosNews.fulfilled]: (state, action) => {
      state.cryptoNews = action.payload;
      state.totalResult = action.payload.totalEstimatedMatches;
      state.page += 1;
    },
    [loadMoreCryptosNews.rejected]: (state, action) => {
      // eslint-disable-next-line
      console.log(action.error.message);
    },
  },
});
export default cryptoNewsSlice.reducer;
export const useCryptoNewsListSelector = () => useSelector((state) => state.cryptoNews);
