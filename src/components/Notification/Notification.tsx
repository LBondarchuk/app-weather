import { Alert, AlertTitle, Slide } from '@mui/material';
import { FC, useEffect } from 'react';

type Props = {
  title?: string;
  text: string;
  show: boolean;
  onClose: () => void;
  severity?: 'info' | 'success';
};

const Notification: FC<Props> = ({ title, text = 'Info', show, onClose, severity = 'info' }) => {
  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (show) {
      timerId = setTimeout(() => {
        onClose();
      }, 2000);
    }
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [show, onClose]);

  return (
    <Slide direction='left' in={show} mountOnEnter unmountOnExit>
      <Alert
        severity={severity}
        className='absolute  top-0 z-50 right-0 w-full max-w-[500px] transition-transform'
      >
        <AlertTitle>{title}</AlertTitle>
        {text}
      </Alert>
    </Slide>
  );
};

export default Notification;
