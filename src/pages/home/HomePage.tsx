import { Link } from 'react-router-dom';
import PageContainer from '../../components/PageContainer/PageContainer';

const HomePage = () => {
  return (
    <PageContainer>
      <div className='flex flex-col items-center justify-center '>
        <h1 className='text-4xl font-bold mb-8 text-white'>Chose Task</h1>
        <div className=' flex gap-10'>
          <Link
            to='/weight-app'
            className='bg-main border hover:bg-opacity-80 text-white font-bold py-4 px-10 rounded-lg transition duration-300'
          >
            Task 1
          </Link>
          <Link
            to='/weather-cities'
            className='bg-main border hover:bg-opacity-80 text-white font-bold py-4 px-10 rounded-lg transition duration-300'
          >
            Task 2
          </Link>
        </div>
      </div>
    </PageContainer>
  );
};

export default HomePage;
