import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import '../stylesheets/Index.css';
import Index from './Index';
import Register from './Register';

import Sponsor from './sponsor/Index';

class App extends Component {
  render() {
    return (
      <div>
        <div id="view">
          <Route path="/" exact component={Index} />
          <Route path="/register" exact component={Register} />
          <Route path="/sponsor" exact component={Sponsor} />
        </div>
      </div>
    );
  }
}

export default App;
