import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API } from '../utils/API';

const userId = sessionStorage.getItem('userId');

export const getCosts = createAsyncThunk('costs/getCosts', async () => {
  const response = await axios.get(`${API}/cost/month/${userId}`);
  return response.data;
});

const costsEntity = createEntityAdapter({
  selectId: (costs) => costs._id.month,
});

const costsSlice = createSlice({
  name: 'costs',
  initialState: costsEntity.getInitialState(),
  extraReducers: {
    [getCosts.fulfilled]: (state, action) => {
      costsEntity.setAll(state, action.payload);
    },
  },
});

export const costsSelector = costsEntity.getSelectors((state) => state.costs);
export default costsSlice.reducer;
