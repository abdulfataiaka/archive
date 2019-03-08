import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  setDeleteCategoryStatus,
} from '../../../../actions/categoryActions';

class Category extends Component {
  constructor(props) {
    super(props);
    this.categoryValid = this.categoryValid.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.state = {
      deleting: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    const oldStatus = this.props.userDeleteCategoriesStatus;
    const newStatus = nextProps.userDeleteCategoriesStatus;
    if (oldStatus !== newStatus) {
      this.setState({
        deleting: false,
      });
      this.props.setDeleteCategoryStatus(null);
    }
  }
  onDelete(event, id) {
    this.setState({
      deleting: true,
    });
    this.props.deleteCategory(id);
  }
  categoryValid() {
    const { id, name } = this.props.category;
    return Number.isInteger(id) && typeof name === 'string' && name.trim().length > 0;
  }
  render() {
    const { id, name } = this.props.category;
    return (
      this.categoryValid
        ? (
          <div className="category">
            <div className="row">
              <div className="col-10 category-text">
                {name}
              </div>
              <div className="col-2">
                <button
                  onClick={() => this.onDelete(this, id)}
                  type="button"
                  className="zero-button category-button"
                  style={{ fontSize: '15px', color: 'gray' }}
                >
                  <i className={`fa ${
                    this.state.deleting
                    ? 'fa-spinner fa-spin'
                    : 'fa-times'}`
                  }
                  />
                </button>
              </div>
            </div>
          </div>
        ) : null
    );
  }
}

Category.propTypes = {
};
const mapStateToProps = (state) => {
  const { categories } = state;
  const { userDeleteCategoriesStatus } = categories;
  return {
    userDeleteCategoriesStatus,
  };
};
const mapDispatchToProps = dispatch => bindActionCreators({
  setDeleteCategoryStatus,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Category);
