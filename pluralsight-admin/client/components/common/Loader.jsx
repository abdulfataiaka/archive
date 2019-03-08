import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ show }) => (
  <div
    className="ml-3"
    style={{ display: `${show ? 'inline-block' : 'none'}` }}
  >
    Loading ...
  </div>
);

Loader.propTypes = {
  show: PropTypes.bool.isRequired
};

export default Loader;
