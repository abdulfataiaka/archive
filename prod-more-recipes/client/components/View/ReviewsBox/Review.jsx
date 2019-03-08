import React from 'react';
import constants from '../../../constants';

const { DEFAULT_USER_AVATAR_PATH } = constants;

export default ({ comment, user }) => {
  const { avatar, username } = user;
  return (
    <div className="recipe-review">
      <div className="aligner">
        <div>
          <img
            alt=""
            className="float-left reviewer-image"
            src={
              typeof avatar === 'string' && avatar.length > 0
              ? avatar
              : DEFAULT_USER_AVATAR_PATH
            }
          />
          <span className="float-left reviewer-username">{username}</span>
          <span className="float-right review-date">
            <i className="fa fa-calendar" /> 30th March 2017
          </span>
          <div className="clear" />
        </div>
        <p className="review-body">
          {comment}
        </p>
      </div>
    </div>
  );
};
