import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const PageContainer: FC<Props> = ({ children }) => {
  return (
    <div className='relative flex flex-col gap-[80px] py-20  min-h-screen xl:px-5 max-w-[1440px] mx-auto overflow-hidden w-full'>
      {children}
    </div>
  );
};

export default PageContainer;
