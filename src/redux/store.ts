import { configureStore } from '@reduxjs/toolkit';
import fetchingDataReducer from './fetchingDataSlice';

export const store = configureStore({
  reducer: {
    fetchingData: fetchingDataReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch