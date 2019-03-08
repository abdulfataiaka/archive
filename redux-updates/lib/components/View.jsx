import React from 'react';
import Header from './Header';
import Row from './Row';
import RowHeader from './RowHeader';

import { homeUpdates } from '../mocks';

import '../styles/main.scss';

const View = ({ }) => (
  <div id="redux-updates">
    <Header />
    
    <div id="content">
      <div className="ru-align">
        <div id="home-table" className="ru-table">
          <div className="ru-row withbg">
            <span className="text">Updates in the last 30 seconds</span>
          </div>

          <div className="ru-row text">
            <span className="text">Table controls</span>
          </div>

          <RowHeader />

          { homeUpdates.map((update, index) => (
            <Row
              key={index}
              version={1}
              data={update}
            />
          )) }      
        </div>
      </div>
    </div>

  </div>
);

export default View;
