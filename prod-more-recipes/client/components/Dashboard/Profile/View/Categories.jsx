import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../../../../public/css/dashboard/category.css';
import LoadError from '../../../partials/LoadError';
import Category from './Category';
import {
  deleteACategory,
  addACategory,
  setAddCategoryStatus,
  setGetCategoriesStatus,
  getUserCategories,
} from '../../../../actions/categoryActions';

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.renderCategoriesJsx = this.renderCategoriesJsx.bind(this);
    this.renderFieldSetJsx = this.renderFieldSetJsx.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.state = {
      categoryName: '',
      categoryNameEmpty: false,
    };
  }
  componentWillMount() {
    if (
      this.props.userCategories === null
      && this.props.userCategoriesStatus !== 'error'
    ) {
      this.props.setGetCategoriesStatus('loading');
    }
  }
  componentWillReceiveProps(nextProps) {
    const { user, userCategories, userCategoriesStatus } = nextProps;
    if (userCategories === null && user !== null && userCategoriesStatus === 'loading') {
      nextProps.getUserCategories(user.userId);
    }
  }
  onFocus() {
    this.setState({
      categoryNameEmpty: false,
    });
  }
  onChange(event) {
    this.setState({
      categoryName: event.target.value,
    });
  }
  addCategory() {
    const { categoryName } = this.state;
    if (typeof categoryName === 'string' && categoryName.length > 0) {
      this.props.setAddCategoryStatus('loading');
      this.setState({
        categoryName: '',
      });
      this.props.addACategory(this.props.user.token, categoryName);
    } else {
      this.setState({
        categoryNameEmpty: true,
      });
    }
  }
  deleteCategory(id) {
    this.props.deleteACategory(this.props.user.token, id);
  }
  renderFieldSetJsx() {
    return (
      <div>
        <input
          onFocus={this.onFocus}
          style={
          this.state.categoryNameEmpty
          ? { border: '1px solid red' }
          : null
        }
          type="text"
          value={this.state.categoryName}
          onChange={this.onChange}
          placeholder="Add category ..."
          className="basic-field"
        />
        <button
          onClick={this.addCategory}
          type="button"
          className="green-button"
        >
          <i className={`fa ${
            this.props.userAddCategoryStatus === 'loading'
            ? 'fa-spinner fa-spin'
            : 'fa-plus'
            }`}
          />
        </button>
      </div>
    );
  }
  renderCategoriesJsx() {
    const {
      userCategoriesStatus,
      userCategories,
    } = this.props;
    if (userCategoriesStatus === 'loading') {
      return (
        <div style={{ margin: '60px 0' }}>
          <LoadError plain mode="loading" title="Loading ..." />
        </div>
      );
    } else if (userCategoriesStatus === 'error' || !Array.isArray(userCategories)) {
      return (
        <div style={{ margin: '60px 0' }}>
          <LoadError plain mode="error" title="Error occured ..." />
        </div>
      );
    } else if (userCategories.length <= 0) {
      return (
        <div style={{ margin: '60px 0' }}>
          <LoadError plain mode="error" title="No categories added yet" />
        </div>
      );
    }
    return userCategories.map(category => (
      <Category
        deleteCategory={this.deleteCategory}
        key={category.id}
        category={category}
      />
    ));
  }
  render() {
    return (
      <div id="category-div">
        <div className="align">
          <h5>CATEGROIES</h5>
          <div className="fieldsetA">
            {this.renderFieldSetJsx()}
          </div>
          <div id="categories">
            {this.renderCategoriesJsx()}
          </div>
        </div>
      </div>
    );
  }
}

Categories.propTypes = {
};
const mapStateToProps = (state) => {
  const { auth, categories } = state;
  return {
    user: auth.user,
    userCategoriesStatus: categories.userCategoriesStatus,
    userCategories: categories.userCategories,
    userAddCategoryStatus: categories.userAddCategoryStatus,
  };
};
const mapDispatchToProps = dispatch => bindActionCreators({
  deleteACategory,
  addACategory,
  setAddCategoryStatus,
  setGetCategoriesStatus,
  getUserCategories,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Categories);
