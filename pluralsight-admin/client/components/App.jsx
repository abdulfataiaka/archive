import React from 'react';
import Routes from './Routes';
import Header from './common/Header';
import '../stylesheets/app.scss';

const App = () => (
  <div id="app">
    <Header />
    <Routes />
  </div>
);

export default App;
