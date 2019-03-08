import actionTypes from '../actions/actionTypes';

export const initialState = [];
export default (state = initialState, action) => {
  const favoriteIds = [...state];
  switch (action.type) {
    case actionTypes.SET_FAVORITES:
      return action.payload;

    case actionTypes.LOGOUT:
      return initialState;

    case actionTypes.ADD_FAVORITE:
      return (
        actionTypes.payload !== null
          ? [...state, action.payload]
          : state
      );

    case actionTypes.USER_RECIPE_DELETED:
      favoriteIds.splice(favoriteIds.indexOf(action.recipeId), 1);
      return favoriteIds;

    case actionTypes.DELETE_FAVORITE:
      favoriteIds.splice(favoriteIds.indexOf(action.recipeId), 1);
      return favoriteIds;

    default:
      return state;
  }
};
