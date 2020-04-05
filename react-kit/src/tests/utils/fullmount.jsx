import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

export default (Component, props = {}) => mount(
  <Router>
    <Component {...props} />
  </Router>
);
