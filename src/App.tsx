import React from 'react';
import { Route, Switch } from 'react-router';
import { Container } from '@material-ui/core';

import AppProviders from './components/AppProvider';
import HomePage from './pages/HomePage';
import FilePage from './pages/FilePage';

import './App.css';

const App: React.FC = () => {
  return (
    <AppProviders>
      <Container maxWidth="xl">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/file" component={FilePage} />
        </Switch>
      </Container>
    </AppProviders>
  );
};

export default App;
