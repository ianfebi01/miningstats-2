import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../utils/API';
import jwt_decode from 'jwt-decode';
import incomeSlice from './incomeSlice';

export const refreshToken = createAsyncThunk(
  'user/refreshToken',
  async (dispatch, getState) => {
    try {
      const response = await axios.get(`${API}/user/token`);
      const decoded = jwt_decode(response.data.accessToken);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }
  }
);

// Then, handle actions in your reducers:
const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    token: '',
    status: null,
  },
  reducers: {
    update: (state, action) => {
      state.users = action.payload.users;
      state.token = action.payload.token;
    },
  },
  extraReducers: {
    [refreshToken.pending]: (state, action) => {
      state.status = 'loading';
    },
    [refreshToken.fulfilled]: (state, action) => {
      state.status = 'success';
      state.token = action.payload.accessToken;
      state.users = jwt_decode(action.payload.accessToken);
    },
    [refreshToken.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export const { update } = userSlice.actions;
export default userSlice.reducer;
