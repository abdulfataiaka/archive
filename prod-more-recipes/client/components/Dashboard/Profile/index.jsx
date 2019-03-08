import React, { Component } from 'react';

import User from './View/User';
import Categories from './View/Categories';

import '../../../../public/css/dashboard/profile.css';
import Avatar from './Edit/Avatar';
import Personal from './Edit/Personal';
import ChangePassword from './Edit/ChangePassword';

import constants from '../../../constants';

const {
  DEFAULT_USER_AVATAR_PATH,
} = constants;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
    };

    // To resolve an avatar to default if invalid
    this.resolveAvatar = avatar => (
      (
        typeof avatar === 'string'
        && avatar.trim().length > 0
      ) ? avatar : DEFAULT_USER_AVATAR_PATH
    );

    // To resolve an email to default if invalid
    this.resolveEmail = (email, useOnFail) => (
      (
        typeof email === 'string'
        && email.trim().length > 0
      )
        ? email.trim()
        : useOnFail
    );

    // To caplitalize first letter of text
    this.capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

    // To resolve an gender to default if invalid
    this.resolveGender = (gender) => {
      const realGender = typeof gender !== 'string' ? '' : gender.toLowerCase();
      return (['male', 'female', 'others'].includes(realGender)) ? realGender : null;
    };
  }
  render() {
    return (
      <div className="mb-5">
        {
          this.state.edit
          ? (
            <div>
              <Avatar
                resolveAvatar={this.resolveAvatar}
                closeEditMode={() => this.setState({ edit: false })}
                avatar={`adhd${'222'}`}
              />
              <Personal />
              <ChangePassword />
            </div>
          )
          : (
            <div>
              <User
                capitalize={this.capitalize}
                resolves={{
                  resolveEmail: this.resolveEmail,
                  resolveAvatar: this.resolveAvatar,
                  resolveGender: this.resolveGender,
                }}
                openEditMode={() => this.setState({ edit: true })}
              />
              <Categories />
            </div>
            )
        }
      </div>
    );
  }
}

Profile.propTypes = {
};
export default Profile;
