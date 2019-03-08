import React, { Component } from 'react';
import girlImage from '../images/girl.png';

class GirlCard extends Component {
  render () {
    return (
      <div className="girl-card-2 mb-3">
        <img src={girlImage} alt="" />
        <span className="mt-2 mb-3">{ this.props.name }</span>
        <button type="button">Sponsor</button>
      </div>
    );
  }
}

export default GirlCard;
