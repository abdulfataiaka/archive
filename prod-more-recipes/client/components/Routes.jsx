import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Landing from './Landing';
import View from './View';
import Dashboard from './Dashboard';
import Catalog from '../components/Catalog';


export default () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/recipe/:recipeId" component={View} />
    <Route path="/catalog/page/:pageNo" component={Catalog} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/dashboard/favorites" component={Dashboard} />
    <Route exact path="/catalog" component={Catalog} />
    <Route component={() => <Redirect to="/" />} />
  </Switch>
);
