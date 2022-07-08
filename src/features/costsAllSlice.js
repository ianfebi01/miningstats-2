import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../utils/API';

const userId = sessionStorage.getItem('userId');

export const getAllCosts = createAsyncThunk('costs/getAllCosts', async () => {
  const response = await axios.get(`${API}/cost/id/${userId}`);
  return response.data;
});

const costsAllEntity = createEntityAdapter({
  selectId: (costsAll) => costsAll._id,
});

const costsAllSlice = createSlice({
  name: 'costsAll',
  initialState: costsAllEntity.getInitialState(),
  extraReducers: {
    [getAllCosts.fulfilled]: (state, action) => {
      costsAllEntity.setAll(state, action.payload);
    },
  },
});

export const costsAllSelector = costsAllEntity.getSelectors(
  (state) => state.costsAll
);
export default costsAllSlice.reducer;
