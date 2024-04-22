import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const popularCities = ['New York', 'Tokyo', 'Paris', 'London', 'Dubai', 'Singapore', 'Sydney'];

const PopularCities = () => {
  return (
    <div className='flex-2 bg-main bg-opacity-80 border shadow-xl  h-full text-[white] w-full xl:w-[25%] rounded-[30px] py-5'>
      <h3 className='px-3 flex justify-between items-end'>
        <span className='text-[32px]'>Popular cities</span>
        <span className='animate-pulse'>See more</span>
      </h3>
      <ul className='h-full'>
        {popularCities.map((item) => (
          <Link
            to={`/weather-cities/${item.replaceAll(' ', '_').toLowerCase()}`}
            className='h-[10%] px-3 font-thin text-[20px] flex justify-between items-center  hover:cursor-pointer transition  rounded-lg hover:bg-gray-400 hover:scale-105 '
            key={item}
          >
            {item} <FaEye className='text-[24px]' />
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default PopularCities;
