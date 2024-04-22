import React, { useEffect, useState } from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import PeopleTable from '../../components/WeightApp/PeopleTable/PeopleTable';
import AddPersonForm from '../../components/WeightApp/AddPersonForm/AddPersonForm';
import { useAppDispatch, useAppSelector } from '../../lib/redux/hooks';
import { useUser } from '../../providers/UserProvider/UserProvider';
import { getAllItems } from '../../utils/handlers/GetAllItems/GetAllItems';
import { setPeoples } from '../../lib/redux/slices/people';
import { PersonInterface } from '../../utils/types/PrersonInterface';
import { handleDivideTeams } from '../../utils/handlers/divideTeams/divideTeams';
import removeDataFromUser from '../../utils/handlers/removeDataFromUSer/removeDataFromUSer';
import CustomLoadingButton from '../../components/Buttons/LoadingButton/LoadingButton';
import MotionDiv from '../../components/Motions/MotionDiv';
import { setNotification } from '../../lib/redux/slices/notification';

const WeightPage: React.FC = () => {
  const [loading, setLoading] = useState('');
  const dispatch = useAppDispatch();
  const people = useAppSelector((state) => state.people);
  const { currentUser, loading: userLoading } = useUser();

  const [team1, setTeam1] = useState<PersonInterface[]>([]);
  const [team2, setTeam2] = useState<PersonInterface[]>([]);

  useEffect(() => {
    let unsub: () => void;

    const fetchPeople = async () => {
      if (!currentUser) return;
      unsub = await getAllItems(currentUser.id, 'people', (people: PersonInterface[]) =>
        dispatch(setPeoples(people)),
      );
    };

    fetchPeople();

    return () => {
      if (unsub) unsub();
    };
  }, [dispatch, currentUser]);
  const removePerson = async (personId: string) => {
    setLoading(personId);

    if (currentUser) {
      await removeDataFromUser(currentUser.id, 'people', personId);
      setLoading('');
    }
  };

  const handleDividePeople = () => {
    if (!people.length) {
      dispatch(
        setNotification({
          type: 'info',
          text: 'Info',
          title: 'The people list is empty',
          show: true,
        }),
      );
    }
    handleDivideTeams(people, setTeam1, setTeam2);
  };

  return (
    <PageContainer>
      {currentUser ? (
        <section className='flex flex-col-reverse gap-5 lg:flex-row justify-between '>
          <div className='relative w-full'>
            {' '}
            <div className='w-fit absolute top-2  right-10'>
              <CustomLoadingButton
                size='small'
                variant='outlined'
                loading={false}
                text='Divide into two teams'
                onClick={handleDividePeople}
              />
            </div>
            <PeopleTable
              people={people}
              title='All people'
              removePerson={removePerson}
              loading={loading}
            />
          </div>
          <AddPersonForm />
        </section>
      ) : (
        <div className='text-white text-[32px] font-bold text-center mt-20 lg:mt-[200px]'>
          {!userLoading && 'Login to use our App'}
        </div>
      )}

      {team1.length > 0 && (
        <section className='flex flex-col gap-5 lg:flex-row justify-between mt-8'>
          <MotionDiv>
            <PeopleTable people={team1} title='Team 1' loading={''} />
          </MotionDiv>
          <MotionDiv>
            <PeopleTable people={team2} title='Team 2' loading={''} />
          </MotionDiv>
        </section>
      )}
    </PageContainer>
  );
};

export default WeightPage;
