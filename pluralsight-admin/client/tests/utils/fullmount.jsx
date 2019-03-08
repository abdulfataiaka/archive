import React from 'react';
import { mount, shallow as shallowRenderer } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const renderer = (method, Component, props, store) => method(
  <Provider store={store}>
    <Router>
      <Component {...props} />
    </Router>
  </Provider>
);

export const shallow = (Component, props = {}, store = {}) => renderer(
  shallowRenderer, Component, props, store
);

export default (Component, props = {}, store = {}) => renderer(
  mount, Component, props, store
);
