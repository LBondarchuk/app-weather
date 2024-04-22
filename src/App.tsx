import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import CityesPage from './pages/cityesPage/CityesPage';
import CityPage from './pages/cityPage/cityPage';
import SignIn from './components/auth/SignIn/SignIn';
import SignUp from './components/auth/SignUp/SignUp';
import { auth } from './firebase/config';
import { useEffect } from 'react';
import { useUser } from './providers/UserProvider/UserProvider';
import Nav from './components/Nav/Nav';
import WeightPage from './pages/WeightPage/WeightPage';
import PageContainer from './components/PageContainer/PageContainer';
import { useAppDispatch, useAppSelector } from './lib/redux/hooks';
import { hideNotifivation, setNotification } from './lib/redux/slices/notification';
import Notification from './components/Notification/Notification';

function App() {
  const path = useLocation().pathname;
  const { currentUser, setCurrentUser, showUserForm, formVariant, setLoading } = useUser();
  const dispatch = useAppDispatch();
  const { text, title, type, show } = useAppSelector((state) => state.notification);
  const onHide = () => {
    dispatch(hideNotifivation());
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.email)
        setCurrentUser({
          id: user.uid,
          email: user.email,
        });

      if (!user) {
        dispatch(
          setNotification({
            type: 'info',
            text: 'Unauthorized',
            title: `Info`,
            show: true,
          }),
        );
      }

      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div
      style={{
        backgroundImage: 'url(/bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className='w-secreen'
    >
      {!path.includes('cities') && (
        <Notification text={text} show={show} title={title} severity={type} onClose={onHide} />
      )}

      <Nav />
      <PageContainer>
        <Routes>
          <Route path='/' Component={() => <HomePage />} />
          <Route path='/weather-cities' Component={() => <CityesPage />} />
          <Route path='/weather-cities/:id' Component={() => <CityPage />} />
          <Route path='/weight-app' Component={() => <WeightPage />} />
        </Routes>
        {!currentUser && showUserForm && (formVariant === 'signIn' ? <SignIn /> : <SignUp />)}
      </PageContainer>
    </div>
  );
}

export default App;
