import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.closeEdit = this.closeEdit.bind(this);
    this.state = {
    };
  }
  closeEdit() {
    this.props.closeEditMode();
  }
  render() {
    const { resolveAvatar } = this.props;
    let { avatar } = this.props;
    avatar = resolveAvatar(avatar);
    return (
      <div id="profile-avatar">
        <div className="align">
          <div>
            <button
              onClick={this.closeEdit}
              className="zero-button float-right profile-edit-close"
            >
              <i className="fa fa-times" />
            </button>
          </div>
          <div className="clear" />
          <div className="text-center">
            <span id="user-image-2">
              <img
                alt=""
                src={avatar}
              />
            </span>
          </div>
          <button
            type="button"
            style={{ margin: '0 auto' }}
            className="mb-3 green-button profile-button"
          >
           CHANGE AVATAR
          </button>
          <div className="profile-avatar-text mb-4">Select a jpeg image</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { profile } = state;
  const avatar = profile.userDetails !== null ? profile.userDetails.avatar : null;
  return {
    avatar,
  };
};
const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);

