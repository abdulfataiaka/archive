import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import Recipes from './Recipes';
import Favorites from './Favorites';

import '../../../../public/css/dashboard/content/index.css';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        {/* Top navigation */}
        <div id="navigation">
          <Link href="/dashboard" to="/dashboard">
            <div className="float-left nav-item">
              <h6 className="float-left">MY RECIPES</h6>
              <div className="clear" />
            </div>
          </Link>
          <Link to="/dashboard/favorites" href="/dashboard/favorites">
            <div className="float-left nav-item ml-4">
              <h6 className="float-left">FAVORITES</h6>
              <div className="clear" />
            </div>
          </Link>
          <div className="clear" />
        </div>
        <div className="content-view">
          <Switch>
            <Route exact path="/dashboard/favorites" component={Favorites} />
            <Route component={Recipes} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Content;
