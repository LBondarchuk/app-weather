/* eslint-disable no-restricted-globals */
import { auth } from '../../firebase/config';
import { useUser } from '../../providers/UserProvider/UserProvider';
import { HiOutlineLogout } from 'react-icons/hi';
import { FaSignInAlt } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';

const Nav = () => {
  const { setShowUserForm, currentUser } = useUser();

  const navigate = useNavigate();
  const signOut = () => {
    auth.signOut();
    navigate('/');
    location.reload();
  };
  return (
    <>
      <header className='flex py-5 md:py-0 flex-col md:flex-row justify-between items-center px-5 md:h-[60px] shadow-xl h-fit'>
        <div>
          <nav className='flex gap-5 text-white'>
            <NavLink to='/' className={({ isActive }) => (isActive ? 'text-yellow-500' : '')}>
              Home
            </NavLink>
            <NavLink
              to='/weather-cities'
              className={({ isActive }) => (isActive ? 'text-yellow-500' : '')}
            >
              Weather App
            </NavLink>
            <NavLink
              to='/weight-app'
              className={({ isActive }) => (isActive ? 'text-yellow-500' : '')}
            >
              Weight App
            </NavLink>
          </nav>
        </div>
        <div>
          {currentUser ? (
            <div className='flex gap-2 items-center text-white text-[20px]'>
              {currentUser.email}
              <button
                className='transition hover:opacity-50 cursor-pointer active:opacity-100'
                onClick={signOut}
              >
                <HiOutlineLogout className='text-white text-[32px] font-bold' />
              </button>
            </div>
          ) : (
            <button
              className='transition hover:opacity-50 cursor-pointer active:opacity-100'
              onClick={() => setShowUserForm(true)}
            >
              <FaSignInAlt className='text-white text-[32px] font-bold' />
            </button>
          )}
        </div>
      </header>
    </>
  );
};

export default Nav;
