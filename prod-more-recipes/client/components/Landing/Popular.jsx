import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import {
  getPopularRecipes,
  setPopularStatus,
} from '../../actions/recipeActions';

import '../../../public/css/home/popular.css';

import Recipe from '../partials/Recipe';
import LoadError from '../partials/LoadError';

class Popular extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.setPopularStatus('loading');
    this.props.getPopularRecipes();
  }
  popularJsx() {
    const { popular } = this.props;
    return (
      <div className="row">
        {
          popular.map(recipe => (
            <Recipe
              lengthy
              controlSet={1}
              classSet={1}
              recipe={recipe}
              key={recipe.id}
            />
          ))
        }
      </div>
    );
  }
  renderJsx() {
    const { popularStatus, popular } = this.props;
    if (popularStatus === 'loading') {
      return (
        <div style={{ marginTop: '130px' }}>
          <LoadError mode="loading" title="Loading popular recipes" />
        </div>
      );
    } else if (popularStatus === 'error' || !Array.isArray(popular)) {
      return (
        <div style={{ marginTop: '130px' }}>
          <LoadError mode="error" title="Unable to load popular recipes" />
        </div>
      );
    } else if (popular.length <= 0) {
      return (
        <div style={{ marginTop: '140px' }}>
          <LoadError mode="error" title="There are no popular recipes at the moment" />
        </div>
      );
    }
    return this.popularJsx();
  }
  render() {
    return (
      <div id="popular-div" className="row">
        <div className="col-12 col-md-10 offset-md-1">
          <h3 id="popular-title">
            Popular Recipes
            <Link to="/catalog" href="/catalog">
              <span>View All</span>
            </Link>
          </h3>
          {this.renderJsx()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { user, favorites, popular } = state;
  return {
    user,
    favorites,
    popular: popular.popular,
    popularStatus: popular.popularStatus,
  };
};
const mapDispatchtToProps = dispatch => bindActionCreators({
  getPopularRecipes,
  setPopularStatus,
}, dispatch);

export default connect(mapStateToProps, mapDispatchtToProps)(Popular);
