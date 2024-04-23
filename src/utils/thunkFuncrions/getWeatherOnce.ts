import { AsyncThunkConfig, GetThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
const API_KEY = 'b84220acddfda8657656b13ba2db78d9';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeatherOnce = async (cityName: string, thunkAPI: GetThunkAPI<AsyncThunkConfig>) => {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const time = `${hours}:${minutes}`;
  try {
    const url = `${API_URL}?q=${cityName}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        console.log('City not found, handling gracefully.');
        return thunkAPI.rejectWithValue('City not found');
      }
      throw new Error('Failed to fetch the weather data');
    }

    const data = await response.json();

    return {
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      weatherDescription: data.weather[0].description,
      iconUrl: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      lastUpdated: time,
      id: data.id,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue('Filed to loading data city');
  }
};
