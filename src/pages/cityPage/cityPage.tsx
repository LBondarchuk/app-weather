import { useEffect, useState } from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import { useLocation } from 'react-router-dom';
import { useUser } from '../../providers/UserProvider/UserProvider';
import { useAppDispatch, useAppSelector } from '../../lib/redux/hooks';
import { fetchWeatherForecast, removeWeatherForecast } from '../../lib/redux/slices/forecast';
import WeatherCard from '../../components/CityDetails/WeatherCard/WeatherCard';
import PopularCities from '../../components/CityDetails/PopularCities/PopularCities';
import Forecast from '../../components/CityDetails/Forecast/Forecast';
import OtherInformation from '../../components/CityDetails/OtherInformation/OtherInformation';
import { motion } from 'framer-motion';
import Map from '../../components/CityDetails/Map/Map';

const CityPage = (): JSX.Element => {
  const [mapCenter, setMapCenter] = useState<{ lng: number; lat: number } | null>(null);
  const { data: cityData } = useAppSelector((state) => state.forecast);
  const path = useLocation().pathname.split('/').pop();
  const { currentUser } = useUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchWeatherForecast(path?.replaceAll('_', ' ') || ''));
  }, [path, dispatch]);

  useEffect(() => {
    if (cityData) {
      setMapCenter({ lat: cityData.city.coord.lat, lng: cityData.city.coord.lon });
    }
  }, [cityData, path]);

  const setMap = () => {};

  return (
    <>
      <PageContainer>
        {cityData && currentUser && (
          <>
            <motion.section
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              className='flex flex-col xl:flex-row gap-5 h-fit xl:h-[400px] text-white w-full '
            >
              {cityData && <WeatherCard cityData={cityData} />}
              {mapCenter && <Map mapCenter={mapCenter} />}
              <PopularCities />
            </motion.section>
            <section className='xl:h-[500px] flex  flex-col xl:flex-row gap-[30px] w-full '>
              <Forecast list={cityData.list} />
              <OtherInformation name={cityData.city.name} population={cityData.city.population} />
            </section>
          </>
        )}
      </PageContainer>
    </>
  );
};

export default CityPage;
