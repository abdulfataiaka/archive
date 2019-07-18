import React from 'react';
import PropTypes from 'prop-types';

const View = ({ view, error, email, password, loading, onChange, onSubmit }) => (
  <div id="auth">
    <div id="white-box">
      <h5>{view}</h5>
      <h6>{view} to access to File Transfer</h6>
      <p className={`${!!error ? 'error' : ''}`}>
        { 
          !!error
            ? error
            : 'Provide required details'
        }
      </p>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            onChange={onChange}
            type="email"
            name="email"
            value={email}
            placeholder="e.g user@gmail.com"
          /> 
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          /> 
        </div>

        <button type="submit">
          {
            loading
              ? (
                <span className="auth-loader">
                  <img src="/images/loader.gif" /> 
                  <span>Loading</span>
                </span>
              )
              : view
          }
        </button>
      </form>
    </div>
  </div>
);

View.propTypes = {
  view: PropTypes.string.isRequired,
  error: PropTypes.any,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default View;
