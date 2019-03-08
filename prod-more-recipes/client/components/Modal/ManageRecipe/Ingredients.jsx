import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  setManageRecipeStatus,
  setManageRecipeEntry,
} from '../../../actions/recipeActions';


import {
  capitalize,
} from '../../../utils';

class Ingredients extends Component {
  constructor(props) {
    super(props);

    this.removeIngredient = this.removeIngredient.bind(this);
    this.onFocusIngredientField = this.onFocusIngredientField.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.ingredientExists = this.ingredientExists.bind(this);
    this.renderIngredients = this.renderIngredients.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      ingredientField: '',
      showNewIngredientError: false,
    };
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onFocusIngredientField() {
    this.setState({
      showNewIngredientError: false,
    });
    this.props.setManageRecipeStatus(null);
  }
  addIngredient() {
    let newIngredients;
    const { ingredients } = this.props;
    const { ingredientField } = this.state;
    if (this.ingredientExists(ingredientField)) {
      this.setState({
        showNewIngredientError: true,
      });
    } else if (typeof ingredientField !== 'string' || ingredientField.length <= 0) {
      this.setState({
        showNewIngredientError: true,
        ingredientField: '',
      });
    } else {
      if (Array.isArray(ingredients)) {
        newIngredients = [ingredientField.trim().toLowerCase(), ...ingredients];
      } else { newIngredients = [ingredientField.trim().toLowerCase()]; }
      this.setState({
        ingredientField: '',
      });
      this.props.setManageRecipeEntry(
        'ingredients',
        newIngredients,
      );
    }
  }
  ingredientExists(ingredientStr) {
    const ingredient = ingredientStr.toLowerCase();
    const { ingredients } = this.props;
    if (Array.isArray(ingredients)) {
      return ingredients.filter(loopIngredient => (
        loopIngredient === ingredient
      )).length > 0;
    }
    return false;
  }
  removeIngredient(ingredientStr) {
    const ingredient = ingredientStr.toLowerCase();
    const { ingredients } = this.props;
    if (Array.isArray(ingredients)) {
      const newIngredients = ingredients.filter(loopIngredient => (
        loopIngredient.toLowerCase() !== ingredient
      ));
      this.setState({
        ingredients: newIngredients,
      });
      this.props.setManageRecipeEntry(
        'ingredients',
        newIngredients,
      );
    }
  }
  renderIngredients() {
    const { ingredients } = this.props;
    if (Array.isArray(ingredients)) {
      if (ingredients.length > 0) {
        return (
          <div className="mt-4">
            {
              ingredients.map((ingredient, index) => {
                const key = `${index}`;
                return (
                  <span key={key} className="recipe-ingredient-tag">
                    <span className="float-left">{capitalize(ingredient)}</span>
                    <button
                      onClick={() => this.removeIngredient(ingredient)}
                      type="button"
                      className="float-right zero-button"
                    >
                      <i className="fa fa-times ml-2" />
                    </button>
                  </span>
                );
              })
            }
          </div>
        );
      }
      return (
        <h6 style={{
          fontWeight: '200',
          fontSize: '15px',
          marginTop: '20px',
          lineHeight: '170%',
          }}
        >
          Use the fieldset above to add ingredients for recipe
        </h6>
      );
    }
    return null;
  }
  render() {
    return (
      <div>
        <h5 className="recipe-label mt-5">
          <i className="fa fa-cutlery mr-2" />INGREDIENTS
        </h5>
        <div>
          <input
            onChange={this.onChange}
            onFocus={this.onFocusIngredientField}
            name="ingredientField"
            value={this.state.ingredientField}
            style={this.state.showNewIngredientError ? { border: '1px solid red' } : null}
            type="text"
            placeholder="Add ingredients ..."
            className="basic-field recipe-ingredient-field"
          />
          <button
            type="button"
            onClick={this.addIngredient}
            className="green-button recipe-ingredient-button"
          >
            <i className="fa fa-plus" />
          </button>
        </div>
        { this.renderIngredients() }
      </div>
    );
  }
}

const mapStateTopProps = (state) => {
  const { manageRecipe } = state;
  const { ingredients } = manageRecipe;
  return {
    ingredients,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  setManageRecipeEntry,
  setManageRecipeStatus,
}, dispatch);

export default connect(mapStateTopProps, mapDispatchToProps)(Ingredients);
