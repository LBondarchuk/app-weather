import CityCard from '../CityCard/CityCard';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/redux/hooks';
import { useUser } from '../../providers/UserProvider/UserProvider';
import removeCityFromUser from '../../utils/handlers/removeDataFromUSer/removeDataFromUSer';
import { setCities } from '../../lib/redux/slices/cities';
import { fetchWeatherFromSearch, removeWeather } from '../../lib/redux/slices/weatherFromSearch';
import updateCity from '../../utils/handlers/updateData/updateData';
import { WeatherI } from '../../utils/types/WeatherInterface';
import { getAllItems } from '../../utils/handlers/GetAllItems/GetAllItems';
import { Link } from 'react-router-dom';

const CytiesList = () => {
  const { currentUser } = useUser();
  const dispatch = useAppDispatch();
  const [isWeatherUpdated, setUpdated] = useState(false);

  const weatherFromSearch = useAppSelector((state) => state.searchWeather);
  const cities = useAppSelector((state) => state.cities);
  useEffect(() => {
    let unsub: () => void;

    const fetchCities = async () => {
      if (!currentUser) return;
      unsub = await getAllItems(currentUser.id, 'cities', (cities: WeatherI[]) =>
        dispatch(setCities(cities)),
      );
    };

    fetchCities();

    return () => {
      if (unsub) unsub();
    };
  }, [dispatch, weatherFromSearch, currentUser]);

  const updateWeather = async (city: string) => {
    await dispatch(fetchWeatherFromSearch(city));
    setUpdated(true);
  };

  useEffect(() => {
    if (isWeatherUpdated) {
      if (currentUser && weatherFromSearch.data) {
        updateCity(currentUser.id, { ...weatherFromSearch.data }, 'cities');
        dispatch(removeWeather());
        setUpdated(false);
      }
    }
  }, [isWeatherUpdated]);

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 px-5 lg-px-10'>
      {cities &&
        currentUser &&
        cities.map((item) => (
          <div className='relative' key={item.city}>
            <CityCard
              weatherData={item}
              removeCity={removeCityFromUser}
              key={item.city}
              updateWeather={() => updateWeather(item.city)}
            />
            <a
              href={`/weather-cities/${item.city.toLowerCase()}`}
              className='absolute h-[80%] flex items-center justify-center w-full   opacity-0 top-[20%] transition hover:opacity-100 cursor-pointer'
            >
              <span className='border bg-white rounded-[30px] z-20 px-5 py-2 shadow-xl translate-y-[-20px]'>
                Show Forecast
              </span>
            </a>
          </div>
        ))}
    </div>
  );
};

export default CytiesList;
