import { WiSunrise, WiSunset } from 'react-icons/wi';
import { motion } from 'framer-motion';
import { FaSyncAlt, FaTimes } from 'react-icons/fa';
import { useUser } from '../../providers/UserProvider/UserProvider';
import { weatherIcons } from '../../data/weatherIconsData';
import { weatherStyles } from '../../data/weatherStyles';

import classNames from 'classnames';
import { WeatherI } from '../../utils/types/WeatherInterface';
import { CollectionName } from '../../utils/types/colectionsTypes';
import { memo } from 'react';

type CityCardProps = {
  weatherData: WeatherI;
  removeCity?: (user: string, city: CollectionName, id: string) => void;
  updateWeather?: () => void;
};

const CityCard: React.FC<CityCardProps> = memo(({ weatherData, removeCity, updateWeather }) => {
  const { currentUser } = useUser();
  const {
    city,
    country,
    temperature,
    feelsLike,
    humidity,
    pressure,
    weatherDescription,
    iconUrl,
    sunrise,
    sunset,
    lastUpdated,
  } = weatherData;

  return (
    <motion.div
      initial={{
        scale: 0.75,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      className={`${weatherStyles[weatherDescription]}  shadow-lg rounded-lg overflow-hidden mx-auto w-full bg-cover relative opacity-50 border`}
    >
      <div className='px-6 py-4 '>
        {removeCity && updateWeather && (
          <div className='absolute flex gap-5 items-center'>
            <FaTimes
              className=' hover:text-white z-10 cursor-pointer hover:scale-125  text-[32px] text-gray-400 transition '
              onClick={() => {
                if (currentUser && removeCity) removeCity(currentUser.id, 'cities', weatherData.id);
              }}
            />
            <FaSyncAlt
              className={classNames(
                ' hover:text-white z-10 cursor-pointer hover:scale-125  text-[32px] text-gray-400 transition active:rotate-[720deg] ',
              )}
              onClick={updateWeather}
            />
            <span>Last Updated: {lastUpdated}</span>
          </div>
        )}

        <div className='text-center mb-4 relative pt-10'>
          <img
            src={
              weatherIcons[weatherDescription]
                ? `/images/typesOfWeather/${weatherIcons[weatherDescription]}.png`
                : iconUrl
            }
            alt='Weather Icon'
            className='absolute right-[-10px] top-[-10px] inline-block w-[120px] h-[120px]'
          />
          <h2 className='text-xl font-semibold md:text-center text-start'>
            {city}, {country}
          </h2>
          <p className='md:text-center text-start'>{weatherDescription}</p>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <p className='text-sm '>Temperature</p>
            <p className='text-lg font-semibold'>{Math.ceil(temperature)}°C</p>
            <p className='text-sm '>Feels like: {Math.ceil(feelsLike)}°C</p>
          </div>
          <div>
            <p className='text-sm '>Humidity</p>
            <p className='text-lg font-semibold'>{humidity}%</p>
            <p className='text-sm '>Pressure: {pressure} hPa</p>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4 mt-4'>
          <div>
            <p className='text-sm flex items-center gap-2'>
              Sunrise <WiSunrise className='text-[#FFD700] text-[32px]' />
            </p>
            <p>{new Date(sunrise * 1000).toLocaleTimeString()}</p>
          </div>
          <div>
            <p className='text-sm  flex items-center gap-2'>
              Sunset <WiSunset className='text-[#FF6347] text-[32px]' />
            </p>
            <p>{new Date(sunset * 1000).toLocaleTimeString()}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default CityCard;
