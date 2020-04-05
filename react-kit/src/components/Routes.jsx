import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home/Index';
import NotFound from './NotFound';

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route component={NotFound} />
  </Switch>
);
