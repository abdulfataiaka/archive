import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { hideModal } from '../../actions/modalActions';
import {
  setDeleteUserRecipeStatus,
  deleteUserAddedRecipe,
} from '../../actions/recipeActions';
import {
  toastMessage,
} from '../../actions/toasterActions';

import '../../../public/css/modals/confirmRecipeDelete.css';

class RecipeDelete extends Component {
  constructor(props) {
    super(props);
    this.checkClicked = this.checkClicked.bind(this);
    this.state = {
      deleting: false,
    };
  }
  componentWillMount() {
    this.props.setDeleteUserRecipeStatus(null);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.deleteRecipeStatus === 'deleting') {
      this.setState({
        deleting: true,
      });
    } else if (nextProps.deleteRecipeStatus === 'error') {
      nextProps.hideModal();
      nextProps.setDeleteUserRecipeStatus(null);
      nextProps.toastMessage('Unable to delete recipe', 4);
      this.setState({
        deleting: false,
      });
    } else {
      nextProps.hideModal();
      nextProps.toastMessage('Recipe deleted successfully', 4);
      this.setState({
        deleting: false,
      });
    }
  }
  checkClicked(event) {
    const { options } = this.props;
    const { recipeId, token } = options;
    event.preventDefault();
    this.props.setDeleteUserRecipeStatus('deleting');
    this.props.deleteUserAddedRecipe(token, recipeId);
  }
  render() {
    const { hideModal: iHideModal } = this.props;
    return (
      <div className="modal-whitebox mwbox-sm">
        <h5>
          {
            !this.state.deleting
              ? 'Confirm Operation'
              : 'Deleting Recipe'
          }
        </h5>
        <p>
          {
            !this.state.deleting
              ? 'Are you sure you want to delete this recipe from your collections'
              : 'This operation cannot be stopped, reload the page if you encounter any unexpected behaviour'
          }
        </p>
        <div>
          {
            !this.state.deleting
              ? (
                <div className="inline-block float-left">
                  <button
                    type="button"
                    onClick={this.checkClicked}
                    className="float-left confirm-check-button"
                  >
                    <i className="fa fa-check" />
                  </button>
                  <button
                    type="button"
                    className="float-left ml-4 confirm-times-button"
                    onClick={iHideModal}
                  >
                    <i className="fa fa-times" />
                  </button>
                  <div className="clear" />
                </div>
                )
              : (
                <div className="inline-block float-left recipe-deleting">
                  <i className="fa fa-spinner fa-spin" />
                  <span>Deleting</span>
                </div>
                )
          }
          <div className="clear" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { userRecipes } = state;
  const { deleteRecipeStatus } = userRecipes;
  return {
    deleteRecipeStatus,
  };
};
const mapDispatchToProps = dispatch => bindActionCreators({
  hideModal,
  setDeleteUserRecipeStatus,
  toastMessage,
  deleteUserAddedRecipe,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDelete);
