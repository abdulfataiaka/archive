import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import App from './App';
import ReduxUpdates from '../lib/components/Index';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/updates" component={ReduxUpdates} />
      <Route component={App} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
