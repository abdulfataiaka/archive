import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Recipe from '../../partials/Recipe';
import Pagination from '../../partials/Pagination';
import LoadError from '../../partials/LoadError';

import {
  getUserAddedRecipes,
  setUserRecipesStatus,
  setDeleteUserRecipeStatus,
} from '../../../actions/recipeActions';
import modelTypes from '../../Modal/modalTypes';
import { openModal } from '../../../actions/modalActions';

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.showAddRecipemodal = this.showAddRecipemodal.bind(this);
    this.paginate = this.paginate.bind(this);
    this.isPageNo = pageNo => Number.isInteger(parseInt(pageNo, 10));
    this.pageLimit = 4;
    this.state = {
      pageNo: 1,
    };
  }
  componentWillMount() {
    let { pageNo } = this.props.match.params;
    const { recipes, recipesStatus } = this.props;
    if (recipes === null && recipesStatus !== 'error') {
      this.props.setUserRecipesStatus('loading');
    }
    if (!this.isPageNo(pageNo)) {
      pageNo = 1;
    }
    this.setState({ pageNo });
  }
  componentWillReceiveProps(nextProps) {
    const { recipes, recipesStatus, user } = nextProps;
    if (recipes === null && user !== null && recipesStatus === 'loading') {
      nextProps.getUserAddedRecipes(
        user.userId,
        this.state.pageNo,
        this.pageLimit,
      );
    }

    if (nextProps.deleteRecipeStatus === 'deleted') {
      nextProps.setDeleteUserRecipeStatus(null);
      nextProps.setUserRecipesStatus('loading');

      // get page number to load
      const newPageNo = (
        this.state.pageNo > 1 && this.props.recipes.length === 1
          ? this.state.pageNo - 1
          : this.state.pageNo
      );
      nextProps.getUserAddedRecipes(
        user.userId,
        newPageNo,
        this.pageLimit,
      );
      this.setState({
        pageNo: newPageNo,
      });
    }
  }
  showAddRecipemodal() {
    this.props.openModal(modelTypes.ADD_RECIPE_MODAL, {
      token: this.props.user.token,
      pageLimit: this.pageLimit,
    });
  }
  deleteRecipe(recipeId) {
    this.props.openModal(modelTypes.CONFIRM_RECIPE_DELETE_MODAL, {
      recipeId,
      token: this.props.user.token,
    });
  }
  paginate(pageNo) {
    const { user } = this.props;
    const { pageNo: statePageNo } = this.state;
    if (pageNo !== statePageNo) {
      this.props.setUserRecipesStatus('loading');
      this.props.getUserAddedRecipes(
        user.userId,
        pageNo,
        this.pageLimit,
      );
      this.setState({
        pageNo,
      });
    }
  }
  renderRecipesJsx() {
    const { recipes, pagination } = this.props;
    const { pageCount } = pagination;

    if (!Array.isArray(recipes)) return null;
    return (
      <div>
        <div className="row">
          {
            recipes.map(recipe => (
              <Recipe
                key={recipe.id}
                recipe={recipe}
                lengthy
                controlSet={2}
                classSet={3}
              />
            ))
          }
        </div>
        <div className="text-center mt-5 mb-5">
          <Pagination paginate={this.paginate} pages={pageCount} active={this.state.pageNo} />
        </div>
      </div>
    );
  }
  renderJsx() {
    const { recipes, recipesStatus } = this.props;
    if (recipesStatus === 'loading') {
      return (
        <div style={{ marginTop: '60px' }}>
          <LoadError mode="loading" title="Loading your recipes" />
        </div>
      );
    } else if (recipesStatus === 'error' || !Array.isArray(recipes)) {
      return (
        <div style={{ marginTop: '60px' }}>
          <LoadError mode="error" title="Unable to load your recipes" />
        </div>
      );
    } else if (recipes.length <= 0) {
      return (
        <div style={{ marginTop: '60px' }}>
          <LoadError mode="error" plain title="You haven't added any recipe yet" />
        </div>
      );
    }
    return this.renderRecipesJsx();
  }
  render() {
    const { pagination } = this.props;
    return (
      <div>
        <div id="content-header">
          <span className="title">
            My Recipes
            {
              pagination
                ? ` ( ${pagination.totalCount} )`
                : null
            }
          </span>
          <button
            onClick={this.showAddRecipemodal}
            className="float-right green-button"
          >
            <i className="fa fa-plus mr-1" />
            ADD NEW
          </button>
          <div className="clear" />
        </div>
        {this.renderJsx()}
      </div>
    );
  }
}

Recipes.propTypes = {
};

const mapStateToProps = (state) => {
  const { auth, userRecipes } = state;
  const {
    recipes,
    recipesPagination,
    recipesStatus,
    deleteRecipeStatus,
  } = userRecipes;
  return {
    user: auth.user,
    recipes,
    pagination: recipesPagination,
    recipesStatus,
    deleteRecipeStatus,
  };
};
const mapDispatchToProps = dispatch => bindActionCreators({
  openModal,
  getUserAddedRecipes,
  setUserRecipesStatus,
  setDeleteUserRecipeStatus,
}, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Recipes));
