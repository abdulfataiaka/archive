import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  updateUserPersonalDetails,
  setUpdatePersonalDetailsStatus,
} from '../../../../actions/userActions';

class Personal extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.defaultErrorText = 'Please provide required information';

    this.state = {
      error: null,
      errorText: this.defaultErrorText,
      name: '',
      email: '',
      gender: '',
    };

    this.submitResponseIsError = status => (
      status !== null
      && status !== 'loading'
      && status !== true
    );

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

    //  Resolve user details to avoid errors
    this.resolve = (userDetails) => {
      if (userDetails !== null && typeof userDetails === 'object') {
        let { name, email, gender } = userDetails;
        name = (typeof name !== 'string' || name.trim().length <= 0) ? '' : name.trim();
        email = (typeof email !== 'string' || email.trim().length <= 0) ? '' : email.trim();
        gender = (
          typeof gender !== 'string'
          || !['male', 'female', 'others'].includes(gender.trim().toLowerCase())
        ) ? '' : gender.trim().toLowerCase();
        return {
          name,
          email,
          gender,
        };
      }
      return {
        name: '',
        email: '',
        gender: '',
      };
    };
  }
  componentWillMount() {
    const { name, gender, email } = this.resolve(this.props.userDetails);
    this.setState({
      name,
      gender,
      email,
    });
  }
  componentWillReceiveProps(nextProps) {
    if (this.submitResponseIsError(nextProps.userDetailsUpdateStatus)) {
      this.setState({
        error: true,
        errorText: nextProps.userDetailsUpdateStatus,
      });
    } else if (nextProps.userDetailsUpdateStatus === true) {
      this.setState({
        error: false,
        errorText: 'User details updated successfully',
      });
    }
    this.props.setUpdatePersonalDetailsStatus(null);
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.updateUserPersonalDetails(this.props.user.token, {
      name: this.state.name,
      email: this.state.email,
      gender: this.state.gender,
    });
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
  onChangeGender(e) {
    this.setState({
      gender: e.target.value,
      error: null,
      errorText: this.defaultErrorText,
    });
  }
  render() {
    const errorClass = this.getErrorClass(this.state.error);
    return (
      <div id="profile-edit">
        <div className="align">
          <h5>PERSONAL</h5>
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
              <h6>NAME</h6>
              <input
                onChange={this.onChange}
                onFocus={this.onFocus}
                name="name"
                value={this.state.name}
                type="text"
              />
            </div>
            <div className="profile-field-group">
              <h6>EMAIL</h6>
              <input
                value={this.state.email}
                name="email"
                onFocus={this.onFocus}
                onChange={this.onChange}
                type="text"
              />
            </div>
            <div className="profile-field-group">
              <h6>GENDER</h6>
              <select
                name="gender"
                value={this.state.gender}
                onChange={this.onChangeGender}
              >
                <option value="">-- select --</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
            <button
              type="submit"
              className="green-button profile-button"
            >
              UPDATE
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Personal.propTypes = {
};
const mapStateToProps = (state) => {
  const { auth, profile } = state;
  const { userDetails, userDetailsUpdateStatus } = profile;
  return {
    userDetailsUpdateStatus,
    userDetails,
    user: auth.user,
  };
};
const mapDispatchToProps = dispatch => bindActionCreators({
  updateUserPersonalDetails,
  setUpdatePersonalDetailsStatus,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Personal);
