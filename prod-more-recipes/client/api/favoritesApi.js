import axios from 'axios';
import { separateIntoCategories } from '../utils';

/**
 * @description Makes a POST request to add recipe as favorite
 *
 * @param {number} userId
 * @param {number} recipeId
 * @param {stirng} token
 * @param {function} success
 * @param {function} error
 *
 * @returns {Promise} axios
 */
export const addRecipeAsFavorite = (userId, recipeId, token, success, error) => (
  axios.post('/api/v1/users/favorites', { recipeId }, {
    headers: { 'x-user-token': token },
  })
    .then(response => ((response.status === 200) ? success() : error()))
    .catch(() => error())
);

/**
 * @description Makes a POST request to delete a favorite recipe
 *
 * @param {number} userId
 * @param {number} recipeId
 * @param {stirng} token
 * @param {function} success
 * @param {function} error
 *
 * @returns {Promise} axios
 */
export const deleteFavoriteRecipe = (userId, recipeId, token, success, error) => (
  axios.delete('/api/v1/users/favorites', {
    data: { recipeId },
    headers: { 'x-user-token': token },
  })
    .then(response => ((response.status === 200) ? success() : error()))
    .catch(() => error())
);

/**
 * @description Makes a POST request to delete a favorite recipe
 *
 * @param {number} userId
 * @param {array} categories
 * @param {function} success
 * @param {function} error
 *
 * @returns {Promise} axios
 */
export const getFavorites = (userId, categories, success, error) => {
  if (userId === null) {
    return success({ general: [] });
  } else if (userId === undefined) {
    return error(null);
  }
  return axios.get(`/api/v1/users/${userId}/favorites`)
    .then((response) => {
      const recipes = separateIntoCategories(response.data.recipes, categories);
      return (
        recipes !== null
        && typeof recipes === 'object'
      )
        ? success(recipes)
        : error();
    })
    .catch(() => error());
};

/**
 * @description Makes a GET request to get favorite ids
 *
 * @param {number} userId
 * @param {function} success
 * @param {function} error
 *
 * @returns {Promise} axios
 */
export const getFavoriteIds = (userId, success, error) => {
  if (userId === null) {
    return success([]);
  } else if (userId === undefined) {
    return error(null);
  }
  return axios.get(`/api/v1/users/${userId}/favorites/ids`)
    .then((response) => {
      if (Array.isArray(response.data.recipeIds)) return success(response.data.recipeIds);
      return error(null);
    })
    .catch(() => error(null));
};

export default {
  addRecipeAsFavorite,
  deleteFavoriteRecipe,
  getFavoriteIds,
  getFavorites,
};
