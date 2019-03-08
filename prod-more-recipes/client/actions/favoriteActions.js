import actionTypes from './actionTypes';
import {
  addRecipeAsFavorite,
  getFavoriteIds,
  getFavorites,
  deleteFavoriteRecipe,
} from '../api/favoritesApi';

import { toastMessage } from '../actions/toasterActions';

/**
 * @description Calls addRecipeAsFavorite API and dispatches ADD_FAVORITE action
 *
 * @param {number} userId
 * @param {number} recipeId
 * @param {string} token
 */
export const addAsFavorite = (userId, recipeId, token) => dispatch => (
  addRecipeAsFavorite(userId, recipeId, token, () => {
    dispatch({ type: actionTypes.ADD_FAVORITE, payload: recipeId });
    dispatch(toastMessage('Recipe added as favorite', 4));
  }, () => dispatch(toastMessage('Unable to add recipe as favorite', 6)))
);

/**
 * @description Calls deleteFavoriteRecipe API and dispatches DELETE_FAVORITE action
 *
 * @param {number} userId
 * @param {number} recipeId
 * @param {string} token
 */
export const deleteFavorite = (userId, recipeId, token) => dispatch => (
  deleteFavoriteRecipe(userId, recipeId, token, () => {
    dispatch({
      type: actionTypes.DELETE_FAVORITE,
      recipeId,
    });
    dispatch(toastMessage('Favorite recipe removed', 4));
  }, () => dispatch(toastMessage('Unable to remove favorite recipe', 4)))
);

/**
 * @description Calls getFavoriteIds API and dispatches SET_FAVORITES action
 *
 * @param {number} userId
 */
export const setUserFavoriteIds = userId => dispatch => (
  getFavoriteIds(userId, recipeIds => (
    dispatch({ type: actionTypes.SET_FAVORITES, payload: recipeIds })
  ), () => dispatch({ type: actionTypes.SET_FAVORITES, payload: [] }))
);

/**
 * @description Sets status for setting user favorites
 *
 * @param {string} status
 */
export const setUserFavoritesStatus = status => (dispatch) => {
  dispatch({
    type: actionTypes.SET_USER_FAVORITES_STATUS,
    status,
  });
};

/**
 * @description Calls getFavorites API and dispatches SET_USER_FAVORITES action
 *
 * @param {number} userId
 * @param {array} categories
 */
export const getUserFavorites = (userId, categories) => dispatch => (
  getFavorites(userId, categories, recipes => (
    dispatch({
      type: actionTypes.SET_USER_FAVORITES,
      recipes,
    })
  ), () => dispatch(setUserFavoritesStatus('error')))
);

export default {
  addAsFavorite,
  deleteFavorite,
  setUserFavoriteIds,
};
