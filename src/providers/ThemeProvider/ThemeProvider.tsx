import React, { ReactNode } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

type Props = {
  children: ReactNode;
};
const CustomThemeProvider: React.FC<Props> = ({ children }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#2561ae',
      },
      secondary: {
        main: '#ff9800',
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default CustomThemeProvider;
