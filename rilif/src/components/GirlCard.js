import React, { Component } from 'react';
import girlImage from '../images/girl.png';

class GirlCard extends Component {
  render () {
    return (
      <div className="girl-card mb-3">
        <div className="row">
          <div className="col-2">
            <img alt="" src={girlImage} className="girl-image" />
          </div>
          <div className="col-10">
            <div className="girl-name">
              { this.props.name}
              <button type="button" className="view-girl pull-right">View More</button>
            </div>
            <div className="girl-inst mt-2"><span className="mr-2">Institution:</span> { this.props.institute }</div>
            <div className="girl-inst mt-2"><span className="mr-2">Sponsored Amount:</span> { this.props.amount }</div>
          </div>
        </div>
      </div>
    );
  }
}

export default GirlCard;
