import { configureStore } from '@reduxjs/toolkit';
import searchWeatherReducer from './slices/weatherFromSearch';
import citiesReducer from './slices/cities';
import forecastReducer from './slices/forecast';
import peopleReducer from './slices/people';
import notificationReducer from './slices/notification';

export const store = configureStore({
  reducer: {
    searchWeather: searchWeatherReducer,
    cities: citiesReducer,
    forecast: forecastReducer,
    people: peopleReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
