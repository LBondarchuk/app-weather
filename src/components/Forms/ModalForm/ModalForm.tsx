import { FC, ReactNode } from 'react';
import Modal from '@mui/material/Modal';
import { FaTimes } from 'react-icons/fa';
import { useUser } from '../../../providers/UserProvider/UserProvider';

type Props = {
  children: ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const ModalForm: FC<Props> = ({ onSubmit, children }) => {
  const { setShowUserForm } = useUser();

  return (
    <Modal open onClose={() => setShowUserForm(false)} className='flex justify-center items-center'>
      <div className=' bg-white rounded-[32px] text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-[99%] max-w-[500px] p-5'>
        <FaTimes
          className='absolute right-5 top-5 cursor-pointer text-[32px] text-gray-400 transition hover:text-main hover:scale-125'
          onClick={() => setShowUserForm(false)}
        />
        <form onSubmit={onSubmit} className='flex flex-col gap-5'>
          {children}
        </form>
      </div>
    </Modal>
  );
};
