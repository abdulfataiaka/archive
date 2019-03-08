import actionTypes from '../actions/actionTypes';

export const initialState = {
  recipes: null,
  pagination: null,
  recipesStatus: null,
  isSearch: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CATALOG_RECIPES_STATUS:
      return {
        ...state,
        recipesStatus: action.status,
      };
    case actionTypes.SET_CATALOG_RECIPES:
      return {
        ...state,
        recipes: action.recipes,
        pagination: action.pagination,
        isSearch: action.isSearch,
        recipesStatus: null,
      };
    default:
      return state;
  }
};
