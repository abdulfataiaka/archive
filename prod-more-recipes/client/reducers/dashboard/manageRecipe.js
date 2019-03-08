import actionTypes from '../../actions/actionTypes';

export const initialState = {
  title: '',
  procedure: '',
  ingredients: [],
  recipeImageFile: null,
  manageRecipeStatus: null,
};

const entries = [
  'title',
  'procedure',
  'ingredients',
  'recipeImageFile',
];

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RECIPE_ADDED:
      return {
        ...state,
        manageRecipeStatus: true,
      };
    case actionTypes.RECIPE_UPDATED:
      return {
        ...state,
        manageRecipeStatus: true,
      };
    case actionTypes.SET_MANAGE_RECIPE_STATUS:
      return {
        ...state,
        manageRecipeStatus: action.status,
      };
    case actionTypes.SET_MANAGE_RECIPE_RESET_ENTRIES:
      return initialState;

    case actionTypes.LOGOUT:
      return initialState;

    case actionTypes.SET_MANAGE_RECIPE_ENTRY:
      if (entries.includes(action.entry)) {
        return {
          ...state,
          [action.entry]: action.value,
        };
      }
      return { ...state };

    case actionTypes.SET_MANAGE_RECIPE_ENTRIES:
      if (action.pairs !== null && typeof action.pairs === 'object') {
        const editing = {};
        Object.keys(action.pairs).map((entry) => {
          if (entries.includes(entry)) {
            editing[entry] = action.pairs[entry];
          }
          return null;
        });
        return {
          ...state,
          ...editing,
        };
      }
      return state;

    default:
      return state;
  }
};
