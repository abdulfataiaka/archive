import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Auth from './Auth/Index'; 
import Header from './common/Header/Index';
import { Dashboard } from './Dashboard/Index';

import '../stylesheets/main.scss';

const App = () => (
  <Fragment>
    <Header />

    <Switch>
      <Route exact path='/' component={Auth} />
      <Route exact path='/dashboard' component={Dashboard} />
      <Route component={ () => <Redirect to='/' /> } />
    </Switch>
  </Fragment>
);

export default App;
