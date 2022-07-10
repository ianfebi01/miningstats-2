import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../utils/API";

const userId = sessionStorage.getItem("userId");

export const getAllCosts = createAsyncThunk("costs/getAllCosts", async () => {
  const response = await axios.get(`${API}/cost/id/${userId}`);
  return response.data;
});

export const saveCost = createAsyncThunk(
  "costs/saveCost",
  async ({ detail, price, date }) => {
    const response = await axios.post(`${API}/cost`, {
      id: userId,
      detail: detail,
      price: price,
      date: date,
    });
    return response.data;
  }
);

export const deleteCosts = createAsyncThunk("costs/deleteCost", async (id) => {
  await axios.delete(`${API}/cost/${id}`);
  return id;
});

export const updateCosts = createAsyncThunk(
  "costs/updateCosts",
  async ({ id, detail, price, date }) => {
    const response = await axios.patch(`${API}/cost/${id}`, {
      detail,
      price,
      date,
    });
    return response.data;
  }
);

const costsAllEntity = createEntityAdapter({
  selectId: (costsAll) => costsAll._id,
});

const costsAllSlice = createSlice({
  name: "costsAll",
  initialState: costsAllEntity.getInitialState(),
  extraReducers: {
    [getAllCosts.fulfilled]: (state, action) => {
      costsAllEntity.setAll(state, action.payload);
    },
    [saveCost.fulfilled]: (state, action) => {
      costsAllEntity.addOne(state, action.payload);
    },
    [deleteCosts.fulfilled]: (state, action) => {
      costsAllEntity.removeOne(state, action.payload);
    },
    [updateCosts.fulfilled]: (state, action) => {
      costsAllEntity.updateOne(state, {
        id: action.payload._id,
        updates: action.payload,
      });
    },
  },
});

export const costsAllSelector = costsAllEntity.getSelectors(
  (state) => state.costsAll
);
export default costsAllSlice.reducer;
