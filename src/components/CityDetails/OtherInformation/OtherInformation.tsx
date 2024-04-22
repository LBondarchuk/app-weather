import { FC } from 'react';

type Props = {
  name: string;
  population: string;
};

const OtherInformation: FC<Props> = ({ name, population }) => {
  return (
    <div className='w-full min-h-[400px] xl:w-[75%] flex flex-col items-center justify-center text-[20px] xl:text-[40px] text-white'>
      <>
        <h3>Population of {name}: </h3>
        <p className='text-gray-400'>{population.toLocaleString()} </p>
      </>
    </div>
  );
};

export default OtherInformation;
