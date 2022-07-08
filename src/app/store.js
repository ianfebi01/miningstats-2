import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import incomesReducer from '../features/incomeSlice';
import costsReducer from '../features/costSlice';
import costsAllReducer from '../features/costsAllSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    incomes: incomesReducer,
    costs: costsReducer,
    costsAll: costsAllReducer,
  },
});
