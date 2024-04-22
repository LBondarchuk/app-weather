import { FC } from 'react';
import { weatherIcons } from '../../../data/weatherIconsData';
type Props = {
  cityData: any;
};
const WeatherCard: FC<Props> = ({ cityData }) => {
  return (
    <div className='flex flex-col justify-between bg-main bg-opacity-80 border shadow-xl  rounded-[25px] h-full  w-full xl:w-[30%] px-3 py-5'>
      <h2 className='flex justify-between items-center'>
        <div>
          <span>Current weather</span>
        </div>
        <span>{cityData.city.name}</span>
      </h2>
      <div className='relative flex justify-between items-center'>
        <div className='w-full'>
          <img
            className=' w-[80%]'
            src={`/images/typesOfWeather/${
              weatherIcons[cityData.list[0].weather[0].description]
            }.png`}
            alt=''
          />
        </div>
        <div className='relative w-full'>
          <h1>
            <span className='text-[32px] md:text-[60px] relative'>
              {cityData.list[0].main.temp}{' '}
              <span className='absolute right-[-40px] top-[-40px] text-white text-[40px]'>°C</span>
            </span>
            <p className=''>{cityData.list[0].weather[0].description}</p>
          </h1>
        </div>
      </div>
      <div className='flex justify-around'>
        <div>
          <p>Rain</p>
          <p>{cityData.list[0].pop}%</p>
        </div>
        <div>
          <p>Wind</p>
          <p>{cityData.list[0].wind.speed}m/s</p>
        </div>
        <div>
          <p>Humidity</p>
          <p>{cityData.list[0].main.humidity}%</p>
        </div>
        <div>
          <p>Pressure</p>
          <p>{cityData.list[0].main.pressure}hPa</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
