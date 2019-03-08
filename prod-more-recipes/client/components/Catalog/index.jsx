import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Search from './Search';
import Recipe from '../partials/Recipe';
import Pagination from '../partials/Pagination';

import '../../../public/css/catalog/index.css';
import {
  setCatalogRecipesStatus,
  loadCatalogRecipes,
} from '../../actions/recipeActions';
import LoadError from '../partials/LoadError';

export class Catalog extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.reloadContent = this.reloadContent.bind(this);
    this.renderJsx = this.renderJsx.bind(this);
    this.recipesJsx = this.recipesJsx.bind(this);
    this.setQuery = this.setQuery.bind(this);
    this.paginate = this.paginate.bind(this);
    this.getQuery = this.getQuery.bind(this);
    this.pageLimit = 8;
    this.state = {
      pageNo: 1,
      query: '',
    };
  }

  componentWillMount() {
    this.props.setCatalogRecipesStatus('loading');
    this.props.loadCatalogRecipes(
      this.state.pageNo,
      this.pageLimit,
      '',
    );
  }
  getQuery() {
    return this.state.query;
  }
  setQuery(query) {
    this.setState({ query });
  }
  reloadContent() {
    this.setState({
      pageNo: 1,
      query: '',
    });
    this.props.setCatalogRecipesStatus('loading');
    this.props.loadCatalogRecipes(
      this.state.pageNo,
      this.pageLimit,
      '',
    );
  }

  search(query) {
    this.setState({
      pageNo: 1,
      query,
    });
    this.props.setCatalogRecipesStatus('loading');
    this.props.loadCatalogRecipes(
      this.state.pageNo,
      this.pageLimit,
      this.state.query,
    );
  }

  recipesJsx() {
    const {
      recipes,
      pagination,
      favorites,
      user,
    } = this.props;
    const { pageCount } = pagination;
    return (
      <div>
        <div className="row">
          {
            recipes.map((recipe) => {
              const key = `key-${recipe.id}`;
              return (
                <Recipe
                  classSet={2}
                  key={key}
                  controlSet={1}
                  recipe={recipe}
                />
              );
            })
          }
        </div>
        <div className="text-center mt-5 mb-5">
          <Pagination paginate={this.paginate} pages={pageCount} active={this.state.pageNo} />
        </div>
      </div>
    );
  }
  paginate(pageNo) {
    this.setState({
      pageNo,
    });
    this.props.setCatalogRecipesStatus('loading');
    this.props.loadCatalogRecipes(
      pageNo,
      this.pageLimit,
      this.state.query,
    );
  }

  renderJsx() {
    const {
      recipesStatus,
      recipes,
      isSearch,
    } = this.props;

    if (recipesStatus === 'loading') {
      return (
        <div style={{ marginTop: '95px' }}>
          <LoadError
            mode="loading"
            title={
              isSearch
                ? 'Loading search result'
                : 'Loading catalog recipes'
            }
          />
        </div>
      );
    } else if (recipesStatus === 'error' || !Array.isArray(recipes)) {
      return (
        <div style={{ marginTop: '95px' }}>
          <LoadError
            mode="error"
            title={
              isSearch
                ? 'Unable to load search result'
                : 'Unable to load catalog recipes'
            }
          />
        </div>
      );
    } else if (recipes.length <= 0) {
      return (
        <div style={{ marginTop: '95px' }}>
          <LoadError
            mode="error"
            title={
              isSearch
                ? 'No search result found'
                : 'There are no recipes in catalog yet'
            }
          />
        </div>
      );
    }
    return this.recipesJsx();
  }

  render() {
    // Rendering decisions
    return (
      <div>
        <Search
          getQuery={this.getQuery}
          setQuery={this.setQuery}
          reload={this.reloadContent}
          search={this.search}
        />
        <div id="catalog">
          <div className="page-align">
            {this.renderJsx()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { catalog } = state;
  return {
    recipes: catalog.recipes,
    pagination: catalog.pagination,
    recipesStatus: catalog.recipesStatus,
    isSearch: catalog.isSearch,
  };
};
const mapDispatchtToProps = dispatch => bindActionCreators({
  setCatalogRecipesStatus,
  loadCatalogRecipes,
}, dispatch);

export default connect(mapStateToProps, mapDispatchtToProps)(Catalog);
