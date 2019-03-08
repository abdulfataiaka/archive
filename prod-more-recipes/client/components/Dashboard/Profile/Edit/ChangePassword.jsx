import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  updateUserPassword,
  setUpdateUserPasswordStatus,
} from '../../../../actions/userActions';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.defaultErrorText = 'Please provide required information';
    this.state = {
      error: null,
      errorText: this.defaultErrorText,
      current: '',
      new: '',
    };
    // To get class for incoming error true: false: null
    this.getErrorClass = (error) => {
      switch (error) {
        case false:
          return 'profile-error-success';
        case true:
          return 'profile-error-failed';
        default:
          return null;
      }
    };
    this.submitResponseIsError = status => (
      status !== null
      && status !== 'loading'
      && status !== true
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.submitResponseIsError(nextProps.userPasswordUpdateStatus)) {
      this.setState({
        error: true,
        errorText: nextProps.userPasswordUpdateStatus,
      });
    } else if (nextProps.userPasswordUpdateStatus === true) {
      this.setState({
        error: false,
        errorText: 'Password updated successfully',
        current: '',
        new: '',
      });
    }
    this.props.setUpdateUserPasswordStatus(null);
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.updateUserPassword(
      this.props.user.token,
      this.state.current,
      this.state.new,
    );
  }
  onFocus() {
    this.setState({
      error: null,
      errorText: this.defaultErrorText,
    });
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  render() {
    const errorClass = this.getErrorClass(this.state.error);
    return (
      <div id="profile-password">
        <div className="align">
          <h5>CHANGE PASSWORD</h5>
          <div className={`profile-error${
            errorClass !== null
              ? ` ${errorClass}`
              : ''
            }`}
          >
            {this.state.errorText}
          </div>
          <form onSubmit={this.onSubmit}>
            <div className="profile-field-group">
              <h6>CURRENT PASSWORD</h6>
              <input
                name="current"
                value={
                  this.props.changePasswordStatus === true
                    ? ''
                    : this.state.current
                }
                onFocus={this.onFocus}
                onChange={this.onChange}
                type="password"
              />
            </div>
            <div className="profile-field-group">
              <h6>NEW PASSWORD</h6>
              <input
                name="new"
                value={
                  this.props.changePasswordStatus === true
                    ? ''
                    : this.state.new
                }
                onFocus={this.onFocus}
                onChange={this.onChange}
                type="password"
              />
            </div>
            <button
              className="green-button profile-button"
              type="submit"
            >
              CHANGE PASSWORD
            </button>
          </form>
        </div>
      </div>
    );
  }
}

ChangePassword.propTypes = {
};

const mapStateToProps = (state) => {
  const { auth, profile } = state;
  const { userPasswordUpdateStatus } = profile;
  return {
    user: auth.user,
    userPasswordUpdateStatus,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  updateUserPassword,
  setUpdateUserPasswordStatus,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
