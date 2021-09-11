import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import axios from 'axios';

export const getAllMarkets = createAsyncThunk(
  'cryptos/getAllMarkets',
  async () => {
    const res = await axios.get('https://coinranking1.p.rapidapi.com/markets ', {
      headers: {
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        'x-rapidapi-key': '57c70944e9mshceb81b6f7fcf433p1beddbjsnf4a64a893c0a',
      },
    });

    return res.data.data;
  },
);
export const marketsSlice = createSlice({
  name: 'exchanges',
  initialState: {
    marketsList: [],
  },
  reducers: {},
  extraReducers: {
    [getAllMarkets.fulfilled]: (state, action) => {
      // eslint-disable-next-line
      state.marketsList = action.payload;
    },
    [getAllMarkets.rejected]: (state, action) => {
      // eslint-disable-next-line
      console.log(action.error.message);
    },
  },
});
export default marketsSlice.reducer;
export const useMarketsListSelector = () => useSelector((state) => state.marketsList);
