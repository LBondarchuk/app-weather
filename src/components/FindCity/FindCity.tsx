import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/redux/hooks';
import { IoMdSearch } from 'react-icons/io';
import { FaTimes } from 'react-icons/fa';
import CityCard from '../CityCard/CityCard';
import { motion } from 'framer-motion';
import Input from '../Inputs/SearchInput/SearchInput';
import addCityToUser from '../../utils/handlers/addDataToUser';
import { useUser } from '../../providers/UserProvider/UserProvider';
import { fetchWeatherFromSearch, removeWeather } from '../../lib/redux/slices/weatherFromSearch';
import LoadingButton from '@mui/lab/LoadingButton';

const FindCity = () => {
  const { currentUser } = useUser();
  const cityes = useAppSelector((state) => state.cities);
  const { data: weather } = useAppSelector((state) => state.searchWeather);
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const includesInTheList = () => {
    if (!weather) return;
    return cityes.some((item) => item.id === weather.id);
    return false;
  };

  useEffect(() => {
    if (!searchValue) return;
    dispatch(fetchWeatherFromSearch(searchValue));
  }, [dispatch, searchValue]);

  const RemoveCity = () => {
    setSearchValue('');
    dispatch(removeWeather());
  };

  const handleAddCity = async () => {
    if (!currentUser) {
      return;
    } else {
      if (includesInTheList()) {
        RemoveCity();
        return;
      }
      await addCityToUser(currentUser.id, 'cities', weather, setLoading);
    }
    RemoveCity();
  };

  return (
    <>
      {weather && searchValue && (
        <div
          className='absolute inset-0 w-screen h-screen bg-gray-700 opacity-40 '
          onClick={RemoveCity}
        ></div>
      )}
      <section className='relative w-[80%] mx-auto z-20'>
        <div className='relative   text-main transition shadow'>
          <Input variant='large' value={searchValue} onChange={setSearchValue} />
          <div className='absolute right-5 top-[50%] translate-y-[-50%]'>
            <IoMdSearch className=' text-[32px] text-yellow-500' />
          </div>
        </div>

        {weather && currentUser && (
          <LoadingButton
            onClick={handleAddCity}
            loading={loading}
            variant='outlined'
            color={includesInTheList() ? 'success' : 'primary'}
            size='small'
            className='absolute top-[40px] left-2  z-20 rounded-xl'
            sx={{
              py: 0.5,
              borderRadius: '30px',
            }}
          >
            {includesInTheList() ? 'Already added' : 'Add city'}
          </LoadingButton>
        )}

        {weather && searchValue && (
          <motion.div
            initial={{
              scale: 0.5,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.5,
              opacity: 0,
              transition: { duration: 0.5, ease: 'easeOut' },
            }}
            className='absolute top-[80px]  bg-white rounded-[32px] h-fit w-full p-x z-10'
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='absolute top-[-16px] right-[-16px] z-10 bg-white rounded-full border border-gray-400 birder-2 cursor-pointer transition hover:scale-125'
            >
              <FaTimes
                className=' text-[32px] text-gray-400 transition hover:text-main '
                onClick={RemoveCity}
              />
            </motion.div>

            <CityCard weatherData={weather} />
          </motion.div>
        )}
      </section>
    </>
  );
};

export default FindCity;
