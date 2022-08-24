import React from 'react';
import { Route, Switch } from 'react-router';
import { Container } from '@material-ui/core';

import AppProviders from './components/AppProvider';
import HomePage from './pages/HomePage';

import './App.css';

const App: React.FC = () => {
  return (
    <AppProviders>
      <Container maxWidth="lg">
        <Switch>
          <Route path="/" exact component={HomePage} />
        </Switch>
      </Container>
    </AppProviders>
  );
};

export default App;
