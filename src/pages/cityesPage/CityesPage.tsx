import FindCity from '../../components/FindCity/FindCity';
import PageContainer from '../../components/PageContainer/PageContainer';
import CytiesList from '../../components/CytiesList/CytiesList';
import { useUser } from '../../providers/UserProvider/UserProvider';

const CityesPage = () => {
  const { currentUser, loading } = useUser();

  return (
    <PageContainer>
      <FindCity />
      {currentUser && <CytiesList />}
      {!currentUser && (
        <div className='text-white text-[32px] font-bold text-center mt-20 lg:mt-[200px]'>
          {!loading && 'Discover, Save, Explore: Login to Unlock Weather Wonders!'}{' '}
        </div>
      )}
    </PageContainer>
  );
};

export default CityesPage;
