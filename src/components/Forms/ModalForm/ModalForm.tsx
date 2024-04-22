import { FC, ReactNode } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useUser } from '../../../providers/UserProvider/UserProvider';
import { motion } from 'framer-motion';
type Props = {
  children: ReactNode;
  onSubmit: () => void;
};

export const ModalForm: FC<Props> = ({ onSubmit, children }) => {
  const { setShowUserForm } = useUser();
  return (
    <div className='fixed z-50 inset-0 overflow-y-auto'>
      <motion.div
        initial={{
          scale: 0.8,
          opacity: 0.5,
        }}
        animate={{
          scale: 1,
          opacity: 0.99,
        }}
        className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'
      >
        <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
          <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
        </div>

        <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
          &#8203;
        </span>

        <div className='inline-block align-bottom bg-white rounded-[32px] text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-[99%] max-w-[500px]'>
          <FaTimes
            className='ml-auto mr-5 mt-5 cursor-pointer text-[32px] text-gray-400 transition hover:text-main hover:scale-125'
            onClick={() => {
              setShowUserForm(false);
            }}
          />
          <form onSubmit={onSubmit}>
            <div className='bg-white px-4 py-10 '>
              <div className='sm:flex sm:items-start'>
                <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex flex-col gap-5 w-full'>
                  {children}
                </div>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
