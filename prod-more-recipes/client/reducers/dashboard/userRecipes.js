import actionTypes from '../../actions/actionTypes';

export const initialState = {
  recipes: null,
  recipesPagination: null,
  recipesStatus: null,
  deleteRecipeStatus: null,
};

export default (state = initialState, action) => {
  if (action.type === actionTypes.RECIPE_UPDATED) {
    const newRecipes = Array.isArray(state.recipes)
      ? [...state.recipes] : [];
    const recipeIndex = newRecipes.findIndex(recipe => (recipe.id === action.recipe.id));
    if (recipeIndex < 0) return state;
    newRecipes[recipeIndex] = action.recipe;
    return {
      ...state,
      recipes: newRecipes,
    };
  }

  switch (action.type) {
    case actionTypes.SET_USER_RECIPES_STATUS:
      return {
        ...state,
        recipesStatus: action.status,
      };

    case actionTypes.LOGOUT:
      return initialState;

    case actionTypes.SET_USER_RECIPES:
      return {
        ...state,
        recipesStatus: null,
        recipes: action.payload.recipes,
        recipesPagination: action.payload.pagination,
      };
    case actionTypes.USER_RECIPE_DELETED:
      return {
        ...state,
        recipes: state.recipes.filter(recipe => (`${recipe.id}` !== `${action.recipeId}`)),
        deleteRecipeStatus: 'deleted',
      };

    case actionTypes.SET_DELETE_USER_RECIPE_STATUS:
      return {
        ...state,
        deleteRecipeStatus: action.status,
      };
    default:
      return state;
  }
};
