import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { authInitOnLoad } from './actions/userActions';
import store from './store';
import App from './components/App';

store.dispatch(authInitOnLoad());

render(
  (
    <Provider store={store} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  ), document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept();
}
