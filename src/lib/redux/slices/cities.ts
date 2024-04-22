import { createSlice } from '@reduxjs/toolkit';
import { WeatherI } from '../../../utils/types/WeatherInterface';
const initialState: WeatherI[] = [];
export const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    setCities: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export default citiesSlice.reducer;
export const { setCities } = citiesSlice.actions;
