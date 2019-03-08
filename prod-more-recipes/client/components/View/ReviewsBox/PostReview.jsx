import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import constants from '../../../constants';
import { postReview } from '../../../actions/recipeActions';

export class PostReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      comment: '',
    };
    this.oldComment = '';
    this.onChange = this.onChange.bind(this);
    this.postComment = this.postComment.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      error: null,
    });
  }
  postComment(e) {
    e.preventDefault();
    if (this.state.comment.length <= 0) {
      this.setState({
        error: 'Please enter a comment to post',
      });
    } else {
      this.oldComment = this.state.comment;
      this.setState({
        comment: '',
      });
      this.props.postReview(this.props.recipeId, this.props.user.token, this.state.comment);
    }
  }
  render() {
    const { avatar } = this.props.user;
    const { DEFAULT_USER_AVATAR_PATH } = constants;
    return (
      <div className="box mb-3">
        <div className="box-head">
          <i className="fa fa-pencil mr-2" />Whats on your mind about this recipe?
        </div>
        <div id="review-post-div">
          <div id="review-post-field-div">
            <img
              className="float-left"
              id="poster-image"
              alt=""
              src={
                typeof avatar === 'string' && avatar.length > 0
                ? avatar
                : DEFAULT_USER_AVATAR_PATH
              }
            />
            <textarea
              name="comment"
              onChange={this.onChange}
              placeholder="Write comment here ..."
              id="post-textarea"
              className="float-left"
              value={this.state.comment}
            />
            <div className="clear" />
          </div>
          <div className="mt-3">
            <button
              onClick={this.postComment}
              className="green-button float-left"
              id="post-button"
            >
              <i className="fa fa-pencil mr-2" />
              Post
            </button>
            <div
              id="post-error"
              style={
                typeof this.state.error === 'string'
                ? { display: 'inline-block' }
                : { display: 'none' }
              }
              className="float-left"
            >
              { this.state.error }
            </div>
            <div className="clear" />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  postReview,
}, dispatch);

export default connect(null, mapDispatchToProps)(PostReview);

