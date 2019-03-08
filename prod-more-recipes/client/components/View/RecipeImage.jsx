import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setUserVoteForView } from '../../actions/voteActions';

import {
  addAsFavorite,
  deleteFavorite,
} from '../../actions/favoriteActions';

import { toastMessage } from '../../actions/toasterActions';

import {
  upvoteARecipe,
  downvoteARecipe,
} from '../../actions/recipeActions';

export class RecipeImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voteSet: false,
    };
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.upVote = this.upVote.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
    this.downVote = this.downVote.bind(this);
    this.resolveVote = vote => (vote !== null && typeof vote === 'object' ? vote.vote : 0);
  }

  componentWillMount() {
    const { recipe, user } = this.props;
    const userId = (user !== null && typeof user === 'object') ? user.userId : null;
    if (userId !== null) {
      this.props.setUserVoteForView(user.token, recipe.id);
      this.setState({
        voteSet: true,
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    const { recipe, user } = nextProps;
    const { voteSet } = this.state;
    const userId = (user !== null && typeof user === 'object') ? user.userId : null;
    if (!voteSet && userId !== null) {
      this.props.setUserVoteForView(user.token, recipe.id);
      this.setState({
        voteSet: true,
      });
    }
    if (nextProps.loggedIn && this.props.loggedIn !== nextProps.loggedIn) {
      this.props.setUserVoteForView(user.token, recipe.id);
      this.setState({
        voteSet: true,
      });
    }
  }
  handleAuth() {
    if (!this.props.loggedIn) {
      this.props.toastMessage('You need to be logged in first', 4);
    }
    return this.props.loggedIn;
  }
  upVote() {
    const { recipe, user } = this.props;
    const status = this.handleAuth();
    if (status === true) {
      this.props.upvoteARecipe(recipe.id, user.token);
    }
  }
  downVote() {
    const { recipe, user } = this.props;
    const status = this.handleAuth();
    if (status === true) {
      this.props.downvoteARecipe(recipe.id, user.token);
    }
  }

  toggleFavorite() {
    const {
      favorites,
      user,
    } = this.props;
    const { recipe } = this.props;
    const status = this.handleAuth();
    if (status === true) {
      if (!favorites.includes(recipe.id)) {
        this.props.addAsFavorite(user.userId, recipe.id, user.token);
      } else {
        this.props.deleteFavorite(user.userId, recipe.id, user.token);
      }
    }
  }
  render() {
    const { recipe, favorites } = this.props;
    let { vote } = this.props;
    vote = this.resolveVote(vote);
    return (
      <div className="box mt-5">
        <div className="box-head">
          <i className="fa fa-image mr-2" /> Image preview
          <span className="float-right">
            <i className="fa fa-eye" /> ({recipe.noviews})
          </span>
          <div className="clear" />
        </div>
        <div className="mt-3 mb-4 box-align">
          {
                typeof recipe.image !== 'string' || recipe.image.length <= 0
                ? <div className="view-default-img"><span className="fa fa-coffee" /></div>
                : <img alt="" className="" src={recipe.image} id="recipe-image" />
            }
        </div>
        <div className="mt-3 mb-4 page-align">
          <button
            onClick={this.upVote}
            className={
                `float-left 
                ${
                    vote === 2
                    ? 'recipe-action-but-active'
                    : 'recipe-action-but'
                }`
                }
            type="button"
          >
            <i className="fa fa-thumbs-up mr-1" />
            <span className="float-right">{recipe.upvotes}</span>
            <div className="clear" />
          </button>
          <button
            onClick={this.downVote}
            className={
                `float-left 
                ${
                    vote === 1
                    ? 'recipe-action-but-active'
                    : 'recipe-action-but'
                }`
                }
            type="button"
          >
            <i className="fa fa-thumbs-down mr-1" />
            <span className="float-right">{recipe.downvotes}</span>
            <div className="clear" />
          </button>
          <button
            onClick={this.toggleFavorite}
            className="float-right zero-button recipe-action-iconbut"
            type="button"
          >
            <i
              className="fa fa-heart"
              style={
                favorites.includes(recipe.id)
                  ? { color: 'red' }
                  : { color: 'gray' }
              }
            />
          </button>
          <div className="clear" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { recipe } = state;
  return {
    vote: recipe.vote,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  addAsFavorite,
  deleteFavorite,
  upvoteARecipe,
  toastMessage,
  setUserVoteForView,
  downvoteARecipe,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RecipeImage);
