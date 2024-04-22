import { FC } from 'react';
import { weatherIcons } from '../../../data/weatherIconsData';

type Props = {
  list: any[];
};

const Forecast: FC<Props> = ({ list }) => {
  return (
    <div className='flex-2 bg-main bg-opacity-80 border shadow-xl h-full text-[white]  w-full xl:w-[30%] rounded-[30px] py-5 px-5 '>
      <h3 className='px-3  flex justify-between items-end'>
        <span className='text-[32px]'>Forecast </span>
        <span className=''>4 days</span>
      </h3>
      {list.slice(1, 5).map((forecast: any, index: number) => (
        <li className='h-[20%] flex justify-between items-center font-thin text-[20px]' key={index}>
          <div className='flex gap-5 items-center '>
            <img
              className='w-10'
              src={`/images/typesOfWeather/${weatherIcons[forecast.weather[0].description]}.png`}
              alt=''
            />
            <span>{Math.ceil(forecast.main.temp)}°C</span>
          </div>
          <div>
            {' '}
            {new Date(forecast.dt_txt).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'short',
              weekday: 'short',
            })}
          </div>
        </li>
      ))}
    </div>
  );
};

export default Forecast;
