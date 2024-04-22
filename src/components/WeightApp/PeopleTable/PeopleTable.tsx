import { motion } from 'framer-motion';
import { FC, useMemo } from 'react';
import { PersonInterface } from '../../../utils/types/PrersonInterface';
import CustomLoadingButton from '../../Buttons/LoadingButton/LoadingButton';

type Props = {
  people: PersonInterface[];
  title: string;
  removePerson?: (id: string) => void;
  loading: string;
};
const PeopleTable: FC<Props> = ({ people, title, removePerson, loading }) => {
  const totalWeight = useMemo(() => {
    return people.reduce((total, person) => total + +person.weight, 0);
  }, [people]);

  return (
    <section className='w-full bg-white rounded-[30px] shadow-xl h-[500px] overflow-scroll max-w-[90%] mx-auto'>
      <div className='flex px-5 items-center justify-between'>
        {' '}
        <h1 className='text-center font-bold mb-4 pt-4'>{title}</h1>
        {!removePerson && (
          <span className='text-main font-medium'>Total weight: {totalWeight}</span>
        )}
      </div>

      <table className='w-full border-collapse '>
        <thead className='sticky top-0'>
          <tr className='bg-main text-white '>
            <th className='py-2 px-4 text-left '>Name</th>
            <th className='py-2 px-4 text-left'>Weight</th>
            {title.includes('All') && removePerson && <th className='py-2 px-4'></th>}
          </tr>
        </thead>
        <tbody>
          {people.map(({ weight, name, id }, index) => (
            <motion.tr
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              key={name + index}
              className='border-b'
            >
              <td className='py-2 px-4 text-[20px] font-bold'>{name}</td>
              <td className='py-2 px-4 text-[20px] font-bold'>{weight}</td>
              {title.includes('All') && removePerson && (
                <td className='py-2 px-4 text-end'>
                  <CustomLoadingButton
                    size='medium'
                    loading={loading === id}
                    text='Remove'
                    onClick={() => removePerson(id)}
                  />
                </td>
              )}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default PeopleTable;
