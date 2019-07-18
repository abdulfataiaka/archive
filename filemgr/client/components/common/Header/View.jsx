import React from 'react';
import PropTypes from 'prop-types';
import AuthLinkView from './AuthLinkView';

const View = ({ viewType, setView }) => (
  <div id="header">
    <div className="align">
      <div>
        <div className="page-info">
          <i className="fas fa-random" />
          <span>File Transfer</span>
        </div>
      </div>

      <div>
        <AuthLinkView
          viewType={viewType}
          setView={setView}
        />
      </div>
    </div>
  </div>
);

View.propTypes = {
  viewType: PropTypes.number.isRequired,
  setView: PropTypes.func.isRequired
}

export default View;
