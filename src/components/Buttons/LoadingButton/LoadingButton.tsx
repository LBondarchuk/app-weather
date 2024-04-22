import LoadingButton from '@mui/lab/LoadingButton';
import { FC } from 'react';

type Props = {
  loading: boolean;
  text: string;
  onClick?: () => void;
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
};

const CustomLoadingButton: FC<Props> = ({
  loading,
  text,
  onClick,
  size = 'large',
  variant = 'contained',
}) => {
  return (
    <LoadingButton
      onClick={onClick}
      type='submit'
      loading={loading}
      variant={variant}
      color='primary'
      size={size}
      sx={{
        py: size === 'large' ? 2 : 1,
        borderRadius: '30px',
      }}
    >
      {text}
    </LoadingButton>
  );
};

export default CustomLoadingButton;
