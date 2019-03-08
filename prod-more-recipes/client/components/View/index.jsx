import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../../public/css/view/index.css';

import ReviewsBox from './ReviewsBox';
import RecipeImage from './RecipeImage';
import Ingredients from './Ingredients';
import Author from './Author';
import LoadError from '../partials/LoadError';

import { toastMessage } from '../../actions/toasterActions';

import { setUserVoteForView } from '../../actions/voteActions';

import {
  getViewRecipe,
  clearViewRecipe,
  setRecipeViewStatus,
} from '../../actions/recipeActions';

export class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.setRecipeViewStatus('loading');
  }
  componentWillReceiveProps(nextProps) {
    const { recipeId } = nextProps.match.params;
    const { user } = this.props;
    const userId = (user !== null && typeof user === 'object') ? user.userId : null;
    if (nextProps.recipeStatus === 'loading') {
      nextProps.getViewRecipe(recipeId, userId);
    }
  }
  componentWillUnmount() {
    this.props.clearViewRecipe();
  }
  pageContentJsx() {
    const { recipe, user, loggedIn } = this.props;
    return (
      <div className="page-align mb-5">
        <div className="row">
          <div className="col-12 col-lg-8">
            <div className="box mt-5">
              <div className="box-head">
                <i className="fa fa-pencil mr-2" />Title
              </div>
              <div id="recipe-title">
                {recipe.title}
              </div>
            </div>
            <div className="box mt-5">
              <div className="box-head">
                <i className="fa fa-edit mr-2" />Procedure
              </div>
              <div id="recipe-procedure">
                {recipe.procedure}
              </div>
            </div>
            <ReviewsBox loggedIn={loggedIn} user={user} recipe={recipe} />
          </div>
          <div className="col-12 col-lg-4">
            <RecipeImage
              user={user}
              loggedIn={loggedIn}
              recipe={recipe}
              favorites={this.props.favorites}
            />
            <Author avatar={recipe.Owner.avatar} username={recipe.Owner.username} />
            <Ingredients ingredients={recipe.ingredients} />

          </div>
        </div>
      </div>
    );
  }
  renderJsx() {
    const { recipeStatus, recipe } = this.props;

    // Loading jsx
    const loadingJsx = (
      <div style={{ margin: '150px auto' }}>
        <LoadError mode="loading" title="Loading recipe details" />
      </div>
    );

    // Error Jsx
    const errorJsx = (
      <div style={{ margin: '150px auto' }}>
        <LoadError mode="error" title="Ops! Unable to load recipe details" />
      </div>
    );

    if (recipeStatus === 'loading') return loadingJsx;
    else if (
      recipeStatus === 'error'
      || (
        recipe === null
        || typeof recipe !== 'object'
      )
    ) return errorJsx;
    return this.pageContentJsx();
  }
  render() {
    return (
      <div style={{ overflow: 'hidden', background: '#f4f4f4', paddingBottom: '30px' }}>
        { this.renderJsx()}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getViewRecipe,
  clearViewRecipe,
  setRecipeViewStatus,
  setUserVoteForView,
  toastMessage,
}, dispatch);

const mapStateToProps = (state) => {
  const { auth, recipe, favorites } = state;
  return {
    recipe: recipe.recipe,
    vote: recipe.vote,
    recipeStatus: recipe.recipeStatus,
    user: auth.user,
    loggedIn: auth.loggedIn,
    favorites,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(View);
