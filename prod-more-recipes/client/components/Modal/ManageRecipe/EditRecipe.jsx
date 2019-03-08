import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ManageRecipe from './index';

import { splitIngredients } from '../../../utils';
import { setManageRecipeEntries } from '../../../actions/recipeActions';

class EditRecipe extends Component {
  constructor(props) {
    super(props);
    this.hasRecipeProps = this.hasRecipeProps.bind(this);
    this.image = null;
    this.recipeId = null;
  }

  componentWillMount() {
    const { options } = this.props;
    const { recipe } = options;
    if (this.hasRecipeProps()) {
      let {
        id: recipeId,
        title,
        procedure,
        ingredients,
        image,
      } = recipe;
      image = typeof image === 'string' && image.trim().length > 0 ? image : null;
      recipeId = Number.isInteger(parseInt(recipeId, 10)) ? parseInt(recipeId, 10) : null;

      title = typeof title === 'string' ? title.trim() : '';
      procedure = typeof procedure === 'string' ? procedure.trim() : '';
      ingredients = (
        typeof ingredients === 'string'
        && ingredients.length > 0
        && Array.isArray(splitIngredients(ingredients))
      ) ? splitIngredients(ingredients) : [];
      this.image = image;
      this.recipeId = recipeId;

      this.props.setManageRecipeEntries({
        title,
        procedure,
        ingredients,
      });
    }
  }

  hasRecipeProps() {
    const { options } = this.props;
    const { recipe } = options;
    return recipe && typeof recipe === 'object';
  }

  render() {
    return (
      this.hasRecipeProps()
        ? (
          <ManageRecipe
            options={this.props.options}
            image={this.image}
            recipeId={this.recipeId}
            mode="edit"
          />
        )
        : null
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setManageRecipeEntries,
}, dispatch);

export default connect(null, mapDispatchToProps)(EditRecipe);

