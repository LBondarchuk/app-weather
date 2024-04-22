import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeatherI } from '../../../utils/types/WeatherInterface';
import { getWeatherOnce } from '../../../utils/thunkFuncrions/getWeatherOnce';

interface WeatherState {
  data: WeatherI | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: WeatherState = {
  data: null,
  status: 'idle',
  error: null,
};

export const fetchWeatherFromSearch = createAsyncThunk(
  'weather/fetchWeatherDataOnce',
  getWeatherOnce,
);

export const fetchWeatherFromSearchSclice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    removeWeather: (state) => {
      state.data = null;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherFromSearch.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWeatherFromSearch.fulfilled, (state, action: PayloadAction<WeatherI>) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(fetchWeatherFromSearch.rejected, (state, action) => {
        state.status = 'failed';
        state.data = initialState.data;
        state.error = 'Error';
      });
  },
});

export default fetchWeatherFromSearchSclice.reducer;
export const { removeWeather } = fetchWeatherFromSearchSclice.actions;
