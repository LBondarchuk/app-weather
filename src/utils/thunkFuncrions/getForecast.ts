export const getWeatherForecast = async (cityName: string): Promise<any> => {
  const API_KEY = 'b84220acddfda8657656b13ba2db78d9';
  const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

  try {
    const url = `${API_URL}?q=${cityName}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch weather forecast for ${cityName}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
