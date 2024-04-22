import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';
type Props = {
  children: ReactNode;
};

const MotionDiv: FC<Props> = ({ children }) => {
  return (
    <motion.div
      className='w-full'
      initial={{
        opacity: 0,
        scale: 0.75,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
    >
      {children}
    </motion.div>
  );
};

export default MotionDiv;
