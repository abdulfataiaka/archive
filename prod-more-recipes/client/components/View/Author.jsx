import React from 'react';
import constants from '../../constants';

const { DEFAULT_USER_AVATAR_PATH } = constants;

export default ({ avatar, username }) => (
  <div className="box mt-3">
    <div className="box-head">
      <i className="fa fa-user mr-2" /> Author
    </div>
    <div className="page-align mt-3 mb-3">
      <div className="row">
        <div className="col-md-12">
          <img
            alt=""
            className="float-left"
            id="author-image"
            src={
              typeof avatar === 'string' && avatar.length > 0
              ? avatar
              : DEFAULT_USER_AVATAR_PATH
            }
          />
          <div className="float-left" id="author-info">
            <span id="author-name">{username}</span>
            <span id="author-username">
              <i className="fa fa-user mr-2" />Author of the recipe
            </span>
          </div>
          <div className="clear" />
        </div>
      </div>
    </div>
  </div>
);
