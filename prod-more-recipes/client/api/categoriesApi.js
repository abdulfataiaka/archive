import axios from 'axios';

/**
 * @description Makes GET request to get user categories
 *
 * @param {number} userId
 * @param {function} success
 * @param {function} error
 */
export const getCategories = (userId, success, error) => (
  axios.get(`/api/v1/users/${userId}/categories`)
    .then((res) => {
      const { categories } = res.data;
      if (Array.isArray(categories)) {
        return success(categories);
      }
      return error(null);
    })
    .catch(() => error(null))
);

/**
 * @description Makes a DELETE request to delete user category
 *
 * @param {string} token
 * @param {number} categoryId
 * @param {function} success
 * @param {function} error
 */
export const deleteCategory = (token, categoryId, success, error) => (
  axios.delete(`/api/v1/categories/${categoryId}`, {
    headers: {
      'x-user-token': token,
    },
  })
    .then(() => success())
    .catch(() => error())
);

/**
 * @description Makes a PUT request to remove a favorite from category
 *
 * @param {string} token
 * @param {number} favoriteId
 * @param {function} success
 * @param {function} error
 */
export const removeFavoriteFromCategory = (token, favoriteId, success, error) => (
  axios.put('/api/v1/categories/remove', { favoriteId }, {
    headers: {
      'x-user-token': token,
    },
  })
    .then(() => success())
    .catch(() => error())
);

/**
 * @description Makes a PUT request to add favorite recipe to category
 *
 * @param {string} token
 * @param {number} favoriteId
 * @param {number} categoryId
 * @param {function} success
 * @param {function} error
 */
export const addFavoriteToCategory = (token, favoriteId, categoryId, success, error) => (
  axios.put('/api/v1/categories/add', { favoriteId, categoryId }, {
    headers: {
      'x-user-token': token,
    },
  })
    .then(() => success(favoriteId, categoryId))
    .catch(() => error())
);

/**
 * @description Makes a POST request to add a new category
 *
 * @param {string} token
 * @param {string} name
 * @param {function} success
 * @param {function} error
 */
export const addCategory = (token, name, success, error) => (
  axios.post('/api/v1/categories/', { name }, {
    headers: {
      'x-user-token': token,
    },
  })
    .then((res) => {
      const { category } = res.data;
      if (category !== null && typeof category === 'object') {
        return success(category);
      } return error();
    })
    .catch(() => error())
);

export default {
  addCategory,
  getCategories,
  deleteCategory,
  removeFavoriteFromCategory,
};
