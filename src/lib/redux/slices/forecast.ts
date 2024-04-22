import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getWeatherForecast } from '../../../utils/thunkFuncrions/getForecast';

interface ForecastWeatherState {
  data: any | null;
  status: 'idle' | 'loading' | 'failed';
  error: Error | null;
  cityName: string;
}

const initialForecastWeatherState: ForecastWeatherState = {
  data: null,
  status: 'idle',
  error: null,
  cityName: '',
};

export const fetchWeatherForecast = createAsyncThunk(
  'weather/fetchWeatherForecast',
  getWeatherForecast,
);

export const forecastWeatherSlice = createSlice({
  name: 'forecastWeather',
  initialState: initialForecastWeatherState,
  reducers: {
    addCity: (state, action) => {
      state.cityName = action.payload;
      return state;
    },
    removeWeatherForecast: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherForecast.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWeatherForecast.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(fetchWeatherForecast.rejected, (state, action) => {
        state.status = 'failed';
        state.data = null;
        state.error = action.payload as Error;
      });
  },
});

export const { removeWeatherForecast, addCity } = forecastWeatherSlice.actions;

export default forecastWeatherSlice.reducer;
