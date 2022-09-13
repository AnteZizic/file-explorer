import React, {FC} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {CssBaseline, ThemeProvider} from '@material-ui/core';

import {DataProvider} from '../contexts/DataContext';
import theme from '../theme';

type TAppProvidersProps = {
  children: React.ReactNode
}

const AppProviders: FC<TAppProvidersProps> = ({children}) => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline>
          <DataProvider>
            {children}
          </DataProvider>
        </CssBaseline>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default AppProviders;
