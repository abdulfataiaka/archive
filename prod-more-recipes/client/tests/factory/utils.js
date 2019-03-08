/* eslint-disable */

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

export const wrapMount = (Component, store, props) => mount((
  <Provider store={store}>
    <BrowserRouter>
      <Component {...props} />
    </BrowserRouter>
  </Provider>
));

export default {};
