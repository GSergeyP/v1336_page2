import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const url = 'https://v1336-api-test.onrender.com/getPointsFast';

export const getFetchingData: any = createAsyncThunk(
  'fetchingData/getFetchingData',
  async (points: number) => {
    const resp = await axios({
      method: 'get',
      url: url,
      params: {
        points: points
      }
    })
    .then(data => data.data )
    //.catch((err) => console.log(err));
  return resp
})