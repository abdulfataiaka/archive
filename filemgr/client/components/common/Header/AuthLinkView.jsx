import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthLinkView = ({ viewType, setView }) => (
  <span className="auth-link">
    {
      viewType == 1
        ? (
          <span>
            DON'T HAVE AN ACCOUNT?&nbsp;
            <Link
              to="#"
              onClick={e => setView(e, 2)}
            >
              SIGN UP
            </Link>
          </span>
        )
        : (
          <span>
            ALREADY HAVE AN ACCOUNT?&nbsp;
            <Link
              to="#"
              onClick={e => setView(e, 1) }
            >
              SIGN IN
            </Link>
          </span>
        )
    }
  </span>
);

AuthLinkView.propTypes = {
  viewType: PropTypes.number.isRequired
}

export default AuthLinkView;