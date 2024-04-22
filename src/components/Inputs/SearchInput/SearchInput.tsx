import { FC } from 'react';
import cn from 'classnames';

type Props = {
  variant?: 'small' | 'large';
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

const Input: FC<Props> = ({ variant = 'large', placeholder, value, onChange }) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        'w-full block border bg-transparent transition focus:bg-white hover:bg-white focus:outline-gray-400  placeholder:text-gray-100 hover:placeholder:text-gray-700 focus:placeholder:text-gray-700  text-gray-700 text-center',
        {
          'rounded-[30px] px-[25px] py-3 text-lg placeholder:text-[22px] text-[22px]':
            variant === 'large',
          rounded: variant === 'small',
        },
      )}
      placeholder={placeholder || 'Find city'}
    />
  );
};

export default Input;
