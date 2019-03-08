import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { hideModal } from '../../actions/modalActions';
import {
  addToCategory,
  setAddToCategoryStatus,
} from '../../actions/categoryActions';
import {
  setUserFavoritesStatus,
} from '../../actions/favoriteActions';
import {
  toastMessage,
} from '../../actions/toasterActions';

import '../../../public/css/modals/categorySelect.css';

class CategorySelect extends Component {
  constructor(props) {
    super(props);
    this.setAsSelected = this.setAsSelected.bind(this);
    this.addFavToCategory = this.addFavToCategory.bind(this);
    this.state = {
      selected: null,
      error: false,
    };
  }
  componentWillMount() {
    this.setState({ selected: null });
  }

  componentWillReceiveProps(nextProps) {
    const { addToCategoryStatus } = nextProps;
    if (addToCategoryStatus === true) {
      this.props.setUserFavoritesStatus('loading');
      this.props.setAddToCategoryStatus(null);
      this.props.hideModal();
      this.props.toastMessage('Favorite added to category', 2);
    }
  }

  setAsSelected(category) {
    this.setState({
      selected: { ...category },
      error: false,
    });
  }

  addFavToCategory() {
    const { selected } = this.state;
    const { options: { favoriteId }, token } = this.props;
    if (selected === null) {
      this.setState({ error: true });
    } else {
      this.props.addToCategory(token, favoriteId, selected.id);
    }
  }

  render() {
    const { hideModal: iHideModal, categories } = this.props;
    let allCategories = categories;
    if (!Array.isArray(categories)) { allCategories = []; }
    return (
      <div className="modal-whitebox mwbox-sm">
        <h4>Select category</h4>
        <h6
          style={
            !this.state.error
              ? { fontSize: '14px', color: 'gray', marginTop: '15px' }
              : { fontSize: '14px', color: 'red', marginTop: '15px' }
          }
        >
          { !this.state.error
              ? 'Choose from the below list a category to add favorite to'
              : 'Please select a category first'
          }
        </h6>
        {
          allCategories.length <= 0 ? (
            <h6
              style={{ color: 'red', margin: '50px auto' }}
            >
              You do not have any category added yet.
            </h6>
          )
          : (
            <div
              style={{ margin: '50px auto' }}
            >
              {
                  allCategories.map(category => (
                    <div key={category.name} className="categoryModalItem">
                      <input
                        className="float-left"
                        name="category"
                        type="radio"
                        onClick={() => this.setAsSelected(category)}
                      />
                      <span className="float-left">{category.name}</span>
                      <div className="clear" />
                    </div>
                  ))
                }
            </div>
            )
        }
        {
          allCategories.length <= 0 ? null : (
            <button
              type="button"
              className="categoryModalButton"
              onClick={this.addFavToCategory}
            >
              Done
            </button>
          )
        }
        <button
          className="categoryModalButton"
          type="button"
          onClick={() => this.props.hideModal()}
        >
          Cancel
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { categories, auth, userFavorites } = state;
  return {
    categories: categories.userCategories,
    token: auth.user.token,
    addToCategoryStatus: userFavorites.addToCategoryStatus,
  };
};
const mapDispatchToProps = dispatch => bindActionCreators({
  hideModal,
  toastMessage,
  addToCategory,
  setUserFavoritesStatus,
  setAddToCategoryStatus,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelect);
