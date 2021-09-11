import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import axios from 'axios';

export const getAllExchanges = createAsyncThunk(
  'cryptos/getAllCryptos',
  async () => {
    const res = await axios.get('https://coinranking1.p.rapidapi.com/exchanges ', {
      headers: {
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        'x-rapidapi-key': '57c70944e9mshceb81b6f7fcf433p1beddbjsnf4a64a893c0a',
      },
    });

    return res.data.data;
  },
);
export const exchangesSlice = createSlice({
  name: 'exchanges',
  initialState: {
    exchangesList: [],
  },
  reducers: {},
  extraReducers: {
    [getAllExchanges.fulfilled]: (state, action) => {
      // eslint-disable-next-line
      state.exchangesList = action.payload;
    },
    [getAllExchanges.rejected]: (state, action) => {
      // eslint-disable-next-line
      console.log(action.error.message);
    },
  },
});
export default exchangesSlice.reducer;
export const useExchangesListSelector = () => useSelector((state) => state.exchangesList);
