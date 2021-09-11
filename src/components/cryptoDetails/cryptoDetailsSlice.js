import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import axios from 'axios';

export const getCryptoDetails = createAsyncThunk(
  'cryptoDetails/getCryptoDetails',
  async (coinId) => {
    const res = await axios.get(`https://coinranking1.p.rapidapi.com/coin/${coinId}`, {
      headers: {
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        'x-rapidapi-key': '57c70944e9mshceb81b6f7fcf433p1beddbjsnf4a64a893c0a',
      },
    });

    return res.data.data;
  },
);

export const cryptoDetailsSlice = createSlice({
  name: 'cryptoDetails',
  initialState: {
    cryptoDetails: null,
  },
  reducers: {},
  extraReducers: {
    [getCryptoDetails.fulfilled]: (state, action) => {
      state.cryptoDetails = action.payload.coin;
    },
    [getCryptoDetails.rejected]: (state, action) => {
      // eslint-disable-next-line
      console.log(action.error.message);
    },

  },
});
export default cryptoDetailsSlice.reducer;
export const useCryptoDetialsSelector = () => useSelector((state) => state.cryptoDetails);
