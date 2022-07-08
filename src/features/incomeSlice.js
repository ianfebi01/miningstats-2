import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API } from '../utils/API';

export const getIncomes = createAsyncThunk('incomes/getIncomes', async () => {
  const userId = sessionStorage.getItem('userId');
  const response = await axios.get(`${API}/income/month/${userId}`);
  return response.data;
});

const incomeEntity = createEntityAdapter({
  selectId: (incomes) => incomes._id.month,
});

const incomeSlice = createSlice({
  name: 'incomes',
  initialState: incomeEntity.getInitialState(),
  extraReducers: {
    [getIncomes.fulfilled]: (state, action) => {
      incomeEntity.setAll(state, action.payload);
    },
  },
});

export const incomeSelectors = incomeEntity.getSelectors(
  (state) => state.incomes
);

export default incomeSlice.reducer;
