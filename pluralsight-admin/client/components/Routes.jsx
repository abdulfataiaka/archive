import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home/Index';
import About from './About/Index';
import Courses from './Courses/Index';
import NotFound from './NotFound';
import Authors from './Authors/Index';
import ManageCourse from './Courses/ManageCourse';

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/authors" component={Authors} />
    <Route exact path="/courses" component={Courses} />
    <Route exact path="/course" component={ManageCourse} />
    <Route exact path="/course/:id" component={ManageCourse} />
    <Route component={NotFound} />
  </Switch>
);
