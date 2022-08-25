import React, {FC} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {CssBaseline, ThemeProvider} from '@material-ui/core';

import {DataProvider} from '../contexts/DataContext';
import theme from '../theme';

const AppProviders: FC = ({children}: any) => {
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
