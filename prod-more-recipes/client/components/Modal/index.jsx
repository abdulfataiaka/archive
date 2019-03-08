import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../../../public/css/modals/index.css';

import modalTypes from '../Modal/modalTypes';
import AddRecipe from './ManageRecipe/AddRecipe';
import EditRecipe from './ManageRecipe/EditRecipe';
import RecipeDelete from './RecipeDelete';
import SigninModal from './SigninModal';
import SignupModal from './SignupModal';
import CategorySelect from './CategorySelect';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.renderModal = this.renderModal.bind(this);
  }
  handleShow() {
    const { open } = this.props;
    if (open) return { display: 'block' };
    return { display: 'none' };
  }
  renderModal() {
    const { modal, options } = this.props;
    switch (modal) {
      case modalTypes.ADD_RECIPE_MODAL:
        return <AddRecipe options={options} />;
      case modalTypes.EDIT_RECIPE_MODAL:
        return <EditRecipe options={options} />;
      case modalTypes.CONFIRM_RECIPE_DELETE_MODAL:
        return <RecipeDelete options={options} />;
      case modalTypes.SIGNIN_MODAL:
        return <SigninModal options={options} />;
      case modalTypes.SIGNUP_MODAL:
        return <SignupModal options={options} />;
      case modalTypes.SELECT_CATEGORY_MODAL:
        return <CategorySelect options={options} />;
      default:
        return null;
    }
  }
  render() {
    return (
      <div style={this.handleShow()} >
        <div id="modal-overlay" />
        <div id="modal-overlay-top">
          {this.renderModal()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { open, modal, options } = state.modal;
  return {
    open,
    modal,
    options,
  };
};
export default connect(mapStateToProps, null)(Modal);
