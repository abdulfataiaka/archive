import React from 'react';
import { connect } from 'react-redux';

import '../../public/bootstrap/css/bootstrap.min.css';
import '../../public/typography/init.css';
import '../../public/font-awesome/css/font-awesome.min.css';
import '../../public/css/style.css';

import Routes from './Routes';
import Header from './partials/Header';
import Footer from './partials/Footer';
import Toaster from './partials/Toaster';
import Modal from './Modal';

const App = () => (
  <div>
    <Modal />
    <Header />
    <Toaster />
    <Routes />
    <Footer />
  </div>
);

export default App;
