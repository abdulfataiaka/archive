/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import createStore from './store';
import App from './components/App';
import { loadCourses } from './actions/courseActions';
import { loadAuthors } from './actions/authorActions';
import '../node_modules/toastr/build/toastr.min.css';

// create global application store
const store = createStore({});

// Load all courses on app load or render
store.dispatch(loadCourses());
store.dispatch(loadAuthors());

// render main app component with react renderer
render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,

  document.getElementById('react-view')
);
