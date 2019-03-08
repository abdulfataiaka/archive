import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import modelTypes from '../../Modal/modalTypes';
import { openModal } from '../../../actions/modalActions';

export class MyRecipeCtrl extends Component {
  constructor(props) {
    super(props);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.state = {
    };
  }

  editRecipe() {
    const { recipe, token } = this.props;
    this.props.openModal(modelTypes.EDIT_RECIPE_MODAL, {
      recipe,
      token,
    });
  }

  deleteRecipe(recipeId) {
    const { token } = this.props;
    this.props.openModal(modelTypes.CONFIRM_RECIPE_DELETE_MODAL, {
      recipeId,
      token,
    });
  }

  render() {
    const { id } = this.props.recipe;
    return (
      <div>
        {/*   Top section   */}
        <div className="recipe-top-div">
          <button
            className="float-right recipe-hover-button"
            onClick={this.editRecipe}
          >
            <i className="fa fa-edit" />
          </button>
          <div className="clear" />
        </div>
        {/*   Button section   */}
        <div className="recipe-base-div">
          <div className="inline-block float-right">
            <Link href="/" to={`/recipe/${id}`}>
              <button className="float-right recipe-hover-button">
                <i className="fa fa-arrow-right" />
              </button>
            </Link>
            <button
              className="float-right mr-3 recipe-hover-button"
              onClick={() => this.deleteRecipe(id)}
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
  return {
    token,
  };
};
const mapDispatchToProps = dispatch => bindActionCreators({
  openModal,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MyRecipeCtrl);
