import { FC } from 'react';
import cn from 'classnames';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';

type Props = {
  variant?: 'small' | 'large';
  name?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
};

const Input: FC<Props> = ({
  variant = 'large',
  name,
  placeholder,
  label,
  type,
  register,
  registerOptions,
}) => {
  return (
    <div className='w-full'>
      <label className='text-main text-[20px]'>
        {label}
        <input
          {...register(name || '', {
            ...registerOptions,
          })}
          type={type || 'text'}
          name={name}
          className={cn(
            'w-full block border bg-transparent transition focus:bg-white hover:bg-white focus:outline-gray-400 placeholder:text-gray-500  text-gray-700 text-center',
            {
              'rounded-[30px] px-[25px] py-3 text-lg placeholder:text-[22px] text-[22px]':
                variant === 'large',
              rounded: variant === 'small',
            },
          )}
          placeholder={placeholder || 'Find city'}
        />
      </label>
    </div>
  );
};

export default Input;
