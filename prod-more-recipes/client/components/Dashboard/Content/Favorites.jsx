import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { capitalize } from '../../../utils';

import {
  getUserFavorites,
  setUserFavoritesStatus,
} from '../../../actions/favoriteActions';

import Recipe from '../../partials/Recipe';
import LoadError from '../../partials/LoadError';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.renderRecipesJsx = this.renderRecipesJsx.bind(this);
    this.renderJsx = this.renderJsx.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
    this.renderCategoryJsx = (category, recipes) => (
      <div>
        <h3 className="category-name-heading">{category}</h3>
        <div className="row">
          {
            recipes.map(recipe => (
              <Recipe
                key={recipe.id}
                recipe={recipe.Recipe}
                lengthy
                favoriteId={recipe.id}
                categorized={Number.isInteger(parseInt(recipe.categoryId, 10))}
                controlSet={3}
                classSet={3}
              />
            ))
          }
        </div>
      </div>
    );
  }

  componentWillMount() {
    this.props.setUserFavoritesStatus('loading');
  }
  componentWillReceiveProps(nextProps) {
    const {
      recipesStatus,
      user,
      categories,
    } = nextProps;
    if (recipesStatus === 'loading' && user !== null && Array.isArray(categories)) {
      this.props.getUserFavorites(user.userId, categories);
    }
  }
  isEmpty() {
    const { recipes } = this.props;
    const keys = Object.keys(recipes);
    return (
      recipes === null
      || typeof recipes !== 'object'
      || keys.length < 1
      || (
        keys.length === 1
        && recipes[keys[0]].length <= 0
      )
    );
  }
  renderRecipesJsx() {
    const { recipes } = this.props;
    const { general } = recipes;
    return (
      <div>
        {
          general.length > 0
            ? this.renderCategoryJsx('General', general)
            : null
        }
        {
          Object.keys(recipes).map(key => (
            key.toLowerCase() !== 'general'
              ? (
                <div key={key}>
                  { this.renderCategoryJsx(capitalize(key), recipes[key]) }
                </div>
                )
              : null
          ))
        }
      </div>
    );
  }

  renderJsx() {
    const {
      recipes,
      recipesStatus,
    } = this.props;

    if (recipesStatus === 'loading') {
      return (
        <div style={{ marginTop: '60px' }}>
          <LoadError mode="loading" title="Loading your favorites" />
        </div>
      );
    } else if (recipesStatus === 'error' || !recipes) {
      return (
        <div style={{ marginTop: '60px' }}>
          <LoadError mode="error" title="Unable to load your favorites" />
        </div>
      );
    } else if (this.isEmpty()) {
      return (
        <div style={{ marginTop: '60px' }}>
          <LoadError mode="error" title="You haven't added any recipe as favorites" />
        </div>
      );
    }
    return this.renderRecipesJsx();
  }
  render() {
    return (
      <div>
        <div id="content-header">
          <span className="title">Favorite Recipes</span>
          <div className="clear" />
        </div>
        {this.renderJsx()}
      </div>
    );
  }
}

Favorites.propTypes = {
};

const mapStateToProps = (state) => {
  const { auth, userFavorites, categories } = state;
  const {
    recipes,
    recipesStatus,
  } = userFavorites;
  return {
    user: auth.user,
    categories: categories.userCategories,
    recipes,
    recipesStatus,
  };
};
const mapDispatchToProps = dispatch => bindActionCreators({
  getUserFavorites,
  setUserFavoritesStatus,
}, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Favorites));
