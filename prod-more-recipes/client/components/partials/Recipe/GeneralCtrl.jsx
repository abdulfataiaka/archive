import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import constants from '../../../constants';
import { toastMessage } from '../../../actions/toasterActions';
import {
  addAsFavorite,
  deleteFavorite,
} from '../../../actions/favoriteActions';

const { DEFAULT_USER_AVATAR_PATH } = constants;

export class GeneralCtrl extends Component {
  constructor(props) {
    super(props);
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.isFavorite = recipeId => this.props.loggedIn && this.props.favorites.includes(recipeId);
    this.state = {
    };
  }

  toggleFavorite() {
    const { id } = this.props.recipe;
    const { user } = this.props;
    if (!this.props.loggedIn) {
      this.props.toastMessage('You need to be logged in first', 4);
    } else if (!this.isFavorite(id)) {
      this.props.addAsFavorite(user.userId, id, user.token);
    } else {
      this.props.deleteFavorite(user.userId, id, user.token);
    }
  }

  render() {
    const { id, Owner } = this.props.recipe;
    const { avatar, username } = Owner;
    return (
      <div>
        {/*   Top section   */}
        <div className="recipe-top-div">
          <button
            onClick={() => this.toggleFavorite()}
            className="float-right recipe-hover-button"
          >
            <i
              className="fa fa-heart"
              style={
                this.isFavorite(id)
                  ? { color: '#f15050' }
                  : { color: '' }
                }
            />
          </button>
          <div className="clear" />
        </div>
        {/*   Button section   */}
        <div className="recipe-base-div">
          <div className="float-left inline-block">
            <img
              src={
                typeof avatar === 'string'
                && avatar.length > 0
                  ? avatar
                  : DEFAULT_USER_AVATAR_PATH
              }
              alt=""
              className="float-left recipe-user-image"
            />
            <span className="float-left recipe-user-name">{ username }</span>
            <div className="clear" />
          </div>
          <div className="inline-block float-right">
            <Link href="/" to={`/recipe/${id}`}>
              <button className="float-right recipe-hover-button">
                <i className="fa fa-arrow-right" />
              </button>
            </Link>
            <div className="clear" />
          </div>
          <div className="clear" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth, favorites } = state;
  return {
    loggedIn: auth.loggedIn,
    favorites,
    user: auth.user,
  };
};
const mapDispatchToProps = dispatch => bindActionCreators({
  addAsFavorite,
  deleteFavorite,
  toastMessage,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(GeneralCtrl);
