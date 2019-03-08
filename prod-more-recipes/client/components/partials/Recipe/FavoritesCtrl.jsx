import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import constants from '../../../constants';
import modalTypes from '../../Modal/modalTypes';

import {
  deleteFavorite,
} from '../../../actions/favoriteActions';

import {
  openModal,
} from '../../../actions/modalActions';

import {
  removeFromCategory,
} from '../../../actions/categoryActions';

const { DEFAULT_USER_AVATAR_PATH } = constants;

export class FavoritesCtrl extends Component {
  constructor(props) {
    super(props);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
    this.showAddToCategoryModal = this.showAddToCategoryModal.bind(this);
    this.state = {
    };
  }

  deleteRecipe() {
    const { id: recipeId } = this.props.recipe;
    const { token, userId } = this.props;
    this.props.deleteFavorite(userId, recipeId, token);
  }

  removeCategory() {
    const { favoriteId, token } = this.props;
    this.props.removeFromCategory(token, favoriteId);
  }

  showAddToCategoryModal(event) {
    const { favoriteId } = this.props;
    this.props.openModal(modalTypes.SELECT_CATEGORY_MODAL, {
      favoriteId,
    });
  }

  render() {
    const { categorized } = this.props;
    const { id, Owner } = this.props.recipe;
    const { avatar, username } = Owner;
    return (
      <div>
        {/*   Top section   */}
        <div className="recipe-top-div">
          {
            categorized
              ? (
                <button
                  className="float-right recipe-hover-button"
                  onClick={this.removeCategory}
                >
                  <i className="fa fa-minus" />
                </button>
                )
              : (
                <button
                  className="float-right recipe-hover-button"
                  onClick={this.showAddToCategoryModal}
                >
                  <i className="fa fa-plus" />
                </button>
                )
          }

          <div className="clear" />
        </div>
        {/*   Buttom section   */}
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
            <button
              className="float-right mr-2 recipe-hover-button"
              onClick={this.deleteRecipe}
            >
              <i className="fa fa-trash" />
            </button>
            <div className="clear" />
          </div>
          <div className="clear" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  const { user } = auth;
  const token = user !== null ? user.token : null;
  const userId = user !== null ? user.userId : null;
  return {
    token,
    userId,
  };
};
const mapDispatchToProps = dispatch => bindActionCreators({
  deleteFavorite,
  removeFromCategory,
  openModal,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesCtrl);
