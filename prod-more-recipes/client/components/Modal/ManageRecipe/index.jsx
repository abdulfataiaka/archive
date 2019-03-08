import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  resetManageRecipeEntries,
  setManageRecipeEntry,
  setManageRecipeStatus,
  addNewRecipe,
  editNewRecipe,
} from '../../../actions/recipeActions';

import { joinIngredients } from '../../../utils';

import { hideModal } from '../../../actions/modalActions';
import Ingredients from './Ingredients';
import ImagePreview from './ImagePreview';
import Fields from './Fields';

import '../../../../public/css/modals/manageRecipe.css';

class Index extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderError = this.renderError.bind(this);
    this.defErrorText = 'Please provide required information for adding recipe';
  }
  componentWillUnmount() {
    this.resetFields();
  }

  onSubmit(e) {
    e.preventDefault();
    const {
      recipeId,
      title,
      procedure,
      ingredients,
      recipeImageFile,
      mode,
      options,
    } = this.props;

    const { token, pageLimit } = options;
    const joinedIngredients = joinIngredients(ingredients);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('procedure', procedure);
    formData.append('recipeImageFile', recipeImageFile);
    formData.append('ingredients', joinedIngredients);

    if (mode === 'new' || mode === 'edit') {
      this.props.setManageRecipeStatus('loading');
      if (mode === 'new') {
        // Running add recipe instructions
        formData.append('uploadImage', 1);
        this.props.addNewRecipe(token, formData, pageLimit);
      } else {
        const uploadImage = recipeImageFile === null ? 0 : 1;
        formData.append('uploadImage', uploadImage);
        this.props.editNewRecipe(token, recipeId, formData);
      }
    }
  }

  resetFields() {
    this.props.resetManageRecipeEntries();
  }
  renderAddButton() {
    const { manageRecipeStatus, mode } = this.props;
    const addButton = (
      <button
        className="green-button recipe-main-button"
        type="submit"
      >
        <i
          className={
            `fa mr-2 ${
              mode !== 'edit'
                ? 'fa-plus'
                : 'fa-edit'
            }`
          }
        />
        {
          mode !== 'edit'
            ? 'Add Recipe'
            : 'Edit Recipe'
        }
      </button>
    );
    const opsLoading = (
      <span
        className=""
        style={{ display: 'inline-block', padding: '40px 0 5px' }}
      >
        <i className="fa fa-spinner fa-spin mr-2" />
        Please wait ...
      </span>
    );
    if (manageRecipeStatus === 'loading') return opsLoading;
    return addButton;
  }

  renderError() {
    const {
      manageRecipeStatus,
      mode,
    } = this.props;

    if (manageRecipeStatus === true) {
      return (
        <div
          className="mt-4 mb-2"
          style={{ color: 'green' }}
        >
          {
            mode === 'edit'
              ? 'Recipe updated successfully'
              : 'Recipe added successfully'
          }
        </div>
      );
    } else if (
      manageRecipeStatus === 'loading'
      || typeof manageRecipeStatus !== 'string'
    ) {
      return (
        <div
          className="mt-4 mb-2"
          style={{ color: 'gray' }}
        >
          { this.defErrorText}
        </div>
      );
    }
    return (
      <div
        className="mt-4 mb-2"
        style={{ color: 'red' }}
      >
        { manageRecipeStatus }
      </div>
    );
  }
  render() {
    const { mode } = this.props;

    return (
      <div className="modal-whitebox mwbox-lg">
        <div className="mb-5">
          <h5 className="inline-block float-left">
            <i
              className={
                `mr-1 fa ${
                  mode !== 'edit'
                    ? 'fa-plus'
                    : 'fa-edit'
                }`
              }
            />
            {
              mode !== 'edit'
              ? 'New Recipe'
              : 'Edit Recipe'
            }
          </h5>
          <button
            onClick={this.props.hideModal}
            className="float-right modal-xbut"
            type="button"
          >
            <i className="fa fa-times" />
          </button>
          <div className="clear" />
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col-md-7">
              <Fields />
              { this.renderAddButton() }
              { this.renderError() }
            </div>
            <div className="col-md-5">
              <ImagePreview image={this.props.image} />
              <Ingredients />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateTopProps = (state) => {
  const { manageRecipe } = state;
  const { manageRecipeStatus } = manageRecipe;
  const {
    title,
    procedure,
    ingredients,
    recipeImageFile,
  } = manageRecipe;
  return {
    title,
    procedure,
    ingredients,
    recipeImageFile,
    manageRecipeStatus,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  hideModal,
  resetManageRecipeEntries,
  setManageRecipeEntry,
  setManageRecipeStatus,
  addNewRecipe,
  editNewRecipe,
}, dispatch);

export default connect(mapStateTopProps, mapDispatchToProps)(Index);
