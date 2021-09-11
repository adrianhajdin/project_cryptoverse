import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import axios from 'axios';

export const getAllCryptos = createAsyncThunk(
  'cryptos/getAllCryptos',
  async ({ number }) => {
    const res = await axios.get(`https://coinranking1.p.rapidapi.com/coins?limit=${number}`, {
      headers: {
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        'x-rapidapi-key': '57c70944e9mshceb81b6f7fcf433p1beddbjsnf4a64a893c0a',
      },
    });

    return res.data.data;
  },
);
export const loadMoreCryptos = createAsyncThunk(
  'cryptos/loadMoreCryptos',
  async (cryptosPage) => {
    const res = await axios.get(`https://coinranking1.p.rapidapi.com/coins?limit=${cryptosPage * 10}`, {
      headers: {
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        'x-rapidapi-key': '57c70944e9mshceb81b6f7fcf433p1beddbjsnf4a64a893c0a',
      },
    });

    return res.data.data;
  },
);
export const cryptosSlice = createSlice({
  name: 'cryptos',
  initialState: {
    cryptosList: [],
    cryptosPage: 3,
  },
  reducers: {},
  extraReducers: {
    [getAllCryptos.fulfilled]: (state, action) => {
      state.cryptosList = action.payload;
    },
    [getAllCryptos.rejected]: (state, action) => {
      // eslint-disable-next-line
      console.log(action.error.message);
    },
    [loadMoreCryptos.fulfilled]: (state, action) => {
      state.cryptosList = action.payload;
      state.cryptosPage += 1;
    },
    [loadMoreCryptos.rejected]: (state, action) => {
      // eslint-disable-next-line
      console.log(action.error.message);
    },
  },
});
export default cryptosSlice.reducer;
export const useCryptoListSelector = () => useSelector((state) => state.cryptosList);
