import actionTypes from '../../actions/actionTypes';

const removeFromCategory = (state, action) => {
  const categorised = (
    state.recipes === null
    || typeof state.recipes !== 'object'
  ) ? null : { ...state.recipes };
  const general = (
    Object.keys(categorised).includes('general')
      ? categorised.general : []
  );
  const newRecipes = {};
  Object.keys(categorised).map((category) => {
    if (category !== 'general') {
      const foundRecipe = categorised[category].find(favorite => (
        `${favorite.id}` === `${action.favoriteId}`
      ));
      foundRecipe.categoryId = null;
      if (foundRecipe) {
        general.push(foundRecipe);
      }
      const result = categorised[category].filter(favorite => (
        `${favorite.id}` !== `${action.favoriteId}`
      ));
      if (result.length > 0) {
        newRecipes[category] = result;
      }
    }
    return null;
  });
  newRecipes.general = general;
  return newRecipes;
};

const deleteFavorite = (state, action) => {
  const categoried = (
    state.recipes === null
    || typeof state.recipes !== 'object'
  ) ? null : { ...state.recipes };
  if (categoried) {
    const newCategorized = {};
    Object.keys(categoried).map((category) => {
      const result = (
        categoried[category].filter(favorite => (
          `${favorite.recipeId}` !== `${action.recipeId}`
        ))
      );
      if (result.length > 0) { newCategorized[category] = result; }
      return null;
    });
    return {
      ...state,
      recipes: newCategorized,
    };
  }
  return state;
};

export const initialState = {
  recipes: null,
  recipesStatus: null,

  addToCategoryStatus: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REMOVED_FROM_CATEGORY:
      return {
        ...state,
        recipes: removeFromCategory(state, action),
      };

    case actionTypes.DELETE_FAVORITE:
      return deleteFavorite(state, action);

    case actionTypes.LOGOUT:
      return initialState;

    case actionTypes.SET_ADD_TO_CATEGORY_STATUS:
      return {
        ...state,
        addToCategoryStatus: action.status,
      };

    case actionTypes.SET_USER_FAVORITES_STATUS:
      return {
        ...state,
        recipesStatus: action.status,
      };

    case actionTypes.SET_USER_FAVORITES:
      return {
        ...state,
        recipes: action.recipes,
        recipesStatus: null,
      };

    default:
      return state;
  }
};
