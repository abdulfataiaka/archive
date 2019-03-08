import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoadError from '../../../partials/LoadError';

import {
  setGetUserDetailsStatus,
  getUserDetails,
} from '../../../../actions/profileActions';

class User extends Component {
  constructor(props) {
    super(props);
    this.renderUserDetails = this.renderUserDetails.bind(this);
    this.resolveUserDetails = this.resolveUserDetails.bind(this);
    this.userDetailsJsx = this.userDetailsJsx.bind(this);
    this.openEdit = this.openEdit.bind(this);
    this.state = {
    };
  }
  componentWillMount() {
    if (
      this.props.userDetails === null
      && this.props.userDetailsStatus !== 'error'
    ) {
      this.props.setGetUserDetailsStatus('loading');
    }
  }
  componentWillReceiveProps(nextProps) {
    const { user, userDetails, userDetailsStatus } = nextProps;
    if (userDetails === null && user !== null && userDetailsStatus === 'loading') {
      nextProps.getUserDetails(user.userId);
    }
  }
  openEdit() {
    this.props.openEditMode();
  }
  resolveUserDetails() {
    const { resolves } = this.props;
    let {
      avatar,
      gender,
      email,
    } = this.props.userDetails;
    avatar = resolves.resolveAvatar(avatar);
    gender = resolves.resolveGender(gender, 'NA');
    email = resolves.resolveEmail(email, 'Not Available');
    const { name, username } = this.props.userDetails;
    return {
      name,
      username,
      avatar,
      gender,
      email,
    };
  }
  userDetailsJsx() {
    const {
      avatar,
      gender,
      email,
      name,
      username,
    } = this.resolveUserDetails(this.props.userDetails);
    return (
      <div>
        <div id="profile-controls">
          <span id="user-image">
            <img alt="" src={avatar} />
          </span>
          <button
            onClick={this.openEdit}
            className="float-right"
          >
            <i className="fa fa-pencil mr-1" />
            Edit
          </button>
          <div className="clear" />
        </div>
        <div className="user-name">
          <h5>{name.toUpperCase()}</h5>
          <h6><i className="fa fa-user" /> {username}</h6>
        </div>
        <div className="user-info">
          <i className="fa fa-intersex mr-1" />
          <span>{gender === null ? 'NA' : this.props.capitalize(gender)}</span>
        </div>
        <div className="user-info">
          <i className="fa fa-envelope mr-1" />
          <span>{email}</span>
        </div>
      </div>
    );
  }
  renderUserDetails() {
    const { userDetailsStatus, userDetails } = this.props;

    // loading user jsx
    const loadingUserDetailsJsx = (
      <div style={{ margin: '50px auto' }}>
        <LoadError mode="loading" title="Loading" />
      </div>
    );

    // error for loading user jsx
    const userDetailsErrorJsx = (
      <div style={{ margin: '50px auto' }}>
        <LoadError mode="error" title="Could not load user" />
      </div>
    );

    if (userDetailsStatus === 'loading') {
      return loadingUserDetailsJsx;
    } else if (
      userDetailsStatus === 'error'
      || userDetails === null
      || typeof userDetails !== 'object'
    ) {
      return userDetailsErrorJsx;
    }
    return this.userDetailsJsx();
  }
  render() {
    return (
      <div id="profile-info">
        <div className="align">
          {this.renderUserDetails()}
        </div>
      </div>
    );
  }
}

User.propTypes = {
};
const mapDispatchToProps = dispatch => bindActionCreators({
  setGetUserDetailsStatus,
  getUserDetails,
}, dispatch);
const mapStateToProps = (state) => {
  const { auth, profile } = state;
  return {
    user: auth.user,
    userDetails: profile.userDetails,
    userDetailsStatus: profile.userDetailsStatus,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);

