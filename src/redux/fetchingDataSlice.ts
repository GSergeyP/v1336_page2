import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFetchingData } from '../connect/connect'

export interface TFetchingData {
  loading: boolean,
  data: Array<{[key: string]: string | number}> | any,
  error: boolean,
  points: number | null,
}

const initialState: TFetchingData = {
  loading: false,
  data: [],
  error: false,
  points: 1000
}

export const fetchingDataSlice = createSlice({
  name: 'fetchingData',
  initialState,
  reducers: {
    getPoints: (state, action: PayloadAction<number | null>) => {
      state.points = action.payload  
      if(!state.points) state.points = initialState.points;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getFetchingData.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getFetchingData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
        state.error = false;
      })
      .addCase(getFetchingData.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
  },
})

export const { getPoints } = fetchingDataSlice.actions
export default fetchingDataSlice.reducer