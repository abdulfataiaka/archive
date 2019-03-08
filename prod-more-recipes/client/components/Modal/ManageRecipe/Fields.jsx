import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  setManageRecipeStatus,
  setManageRecipeEntries,
  setManageRecipeEntry,
} from '../../../actions/recipeActions';

class Fields extends Component {
  constructor(props) {
    super(props);
    this.onFocus = this.onFocus.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onFocus() {
    this.props.setManageRecipeStatus(null);
  }
  onChange(e) {
    this.props.setManageRecipeEntry(
      e.target.name,
      e.target.value,
    );
  }
  render() {
    return (
      <div>
        <h5 className="recipe-label">
          <i className="fa fa-pencil mr-2" />TITLE
        </h5>
        <input
          onChange={this.onChange}
          value={this.props.title}
          name="title"
          onFocus={this.onFocus}
          type="text"
          className="recipe-title-field"
        />
        <h5 className="mt-4 mb-4 recipe-label">
          <i className="fa fa-book mr-2" />PROCEDURE
        </h5>
        <textarea
          placeholder="How will you describe the procedure for recipe ?"
          className="recipe-procedure-field"
          value={this.props.procedure}
          onFocus={this.onFocus}
          name="procedure"
          onChange={this.onChange}
        />
      </div>
    );
  }
}

const mapStateTopProps = (state) => {
  const { manageRecipe } = state;
  const { title, procedure } = manageRecipe;
  return {
    title,
    procedure,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  setManageRecipeEntry,
  setManageRecipeStatus,
  setManageRecipeEntries,
}, dispatch);

export default connect(mapStateTopProps, mapDispatchToProps)(Fields);
