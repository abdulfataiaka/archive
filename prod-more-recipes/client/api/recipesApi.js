import axios from 'axios';

/**
 * @description Makes a GET request to get all user recipes
 *
 * @param {number} userId
 * @param {number} pageNo
 * @param {number} pageLimit
 * @param {function} success
 * @param {function} error
 */
export const getUserRecipes = (userId, pageNo, pageLimit, success, error) => (
  axios.get(`/api/v1/users/${userId}/recipes?page=${pageNo}&count=${pageLimit}`)
    .then((response) => {
      const { pagination, recipes } = response.data;
      if (pagination !== null && typeof pagination === 'object' && Array.isArray(recipes)) {
        return success(pagination, recipes);
      }
      return error();
    })
    .catch(err => error(err))
);

/**
 * @description Makes a DELETE request to delete user recipe
 *
 * @param {string} token
 * @param {number} recipeId
 * @param {function} success
 * @param {function} error
 */
export const deleteUserRecipe = (token, recipeId, success, error) => (
  axios.delete(`/api/v1/recipes/${recipeId}`, {
    headers: {
      'x-user-token': token,
    },
  })
    .then(() => success())
    .catch(() => error())
);

/**
 * @description Makes a GET request to get catalog recipes
 *
 * @param {number} pageNo
 * @param {number} pageLimit
 * @param {string} queryStr
 * @param {function} success
 * @param {function} error
 */
export const getCatalogRecipes = (pageNo, pageLimit, queryStr, success, error) => {
  let query = null;
  if (typeof queryStr === 'string' && queryStr.length > 0) {
    query = `query=${queryStr.trim()}`;
  }
  let paging = null;
  const page = parseInt(pageNo, 10);
  const size = parseInt(pageLimit, 10);
  if (Number.isInteger(page) && Number.isInteger(size)) {
    paging = `page=${page}&count=${size}`;
  } else if (Number.isInteger(page)) {
    paging = `page=${page}`;
  }
  let route = '/api/v1/recipes';
  if (query !== null && paging !== null) {
    route = `${route}?${query}&${paging}`;
  } else if (query !== null) {
    route = `${route}?${query}`;
  } else if (paging !== null) {
    route = `${route}?${paging}`;
  }
  return axios.get(route)
    .then((res) => {
      const { recipes, pagination } = res.data;
      if (
        Array.isArray(recipes)
        && pagination !== null
        && typeof pagination === 'object'
      ) {
        return success(recipes, pagination, query !== null);
      }
      return error();
    })
    .catch(() => error());
};

/**
 * @description Makes a GET request to get recipe details
 *
 * @param {number} recipeid
 * @param {number} userId
 * @param {function} success
 * @param {function} error
 */
export const getRecipe = (recipeId, userId, success, error) => {
  let uid = null;
  if (typeof userId === 'number') {
    uid = parseInt(userId, 10);
  }
  return axios.get(`/api/v1/recipes/${recipeId}?userId=${uid}`)
    .then((response) => {
      if (response.data.recipe !== null && typeof response.data.recipe === 'object') {
        return success(response.data.recipe);
      }
      return error();
    })
    .catch(() => error());
};

/**
 * @description Makes a GET request to get most upvoted recipes (Popular recipes)
 *
 * @param {function} success
 * @param {function} error
 */
export const getMostUpVotedRecipes = (success, error) => (
  axios.get('/api/v1/recipes?sort=upvotes&order=desc&count=6')
    .then((response) => {
      const { recipes } = response.data;
      if (Array.isArray(recipes)) return success(recipes);
      return error();
    }).catch(() => error())
);

/**
 * @description Makes a PUT request to upvote a recipe
 *
 * @param {number} recipeid
 * @param {string} token
 * @param {function} success
 * @param {function} error
 */
export const upvoteRecipe = (recipeId, token, success, error) => (
  axios.put(`/api/v1/recipes/${recipeId}/upvote`, {}, {
    headers: { 'x-user-token': token },
  })
    .then(() => success())
    .catch(() => error())
);

/**
 * @description Makes a PUT request to downvote a recipe
 *
 * @param {number} recipeid
 * @param {string} token
 * @param {function} success
 * @param {function} error
 */

export const downvoteRecipe = (recipeId, token, success, error) => (
  axios.put(`/api/v1/recipes/${recipeId}/downvote`, {}, {
    headers: { 'x-user-token': token },
  })
    .then(() => success())
    .catch(() => error())
);

/**
 * @description Makes a POST request to post review for recipe
 *
 * @param {number} recipeid
 * @param {string} token
 * @param {string} comment
 * @param {function} success
 * @param {function} error
 */
export const postRecipeReview = (recipeId, token, comment, success, error) => (
  axios.post(`/api/v1/recipes/${recipeId}/reviews`, { comment }, {
    headers: { 'x-user-token': token },
  })
    .then((res) => {
      const { review } = res.data;
      return (review !== null && typeof review === 'object') ? success(review) : error();
    })
    .catch(() => error())
);

/**
 * @description Makes a POST request add a new recipe
 *
 * @param {string} token
 * @param {onject} formData
 * @param {function} success
 * @param {function} error
 */
export const addRecipe = (token, formData, success, error) => (
  axios.post('/api/v1/recipes', formData, {
    headers: {
      'x-user-token': token,
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((response) => {
      const { recipe } = response.data;
      if (recipe) return success(recipe);
      return error('Error occured while adding recipe');
    })
    .catch((err) => {
      let { error: errorMsg } = err.response.data;
      errorMsg = typeof errorMsg === 'string'
        ? errorMsg
        : 'Error occured while adding recipe';
      error(errorMsg);
    })
);

/**
 * @description Makes a PUT request to edit a recipe
 *
 * @param {string} token
 * @param {number} recipeId
 * @param {onject} formData
 * @param {function} success
 * @param {function} error
 */
export const editRecipe = (token, recipeId, formData, success, error) => (
  axios.put(`/api/v1/recipes/${recipeId}`, formData, {
    headers: {
      'x-user-token': token,
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((response) => {
      const { recipe } = response.data;
      if (recipe) return success(recipe);
      return error('Error occured while updating recipe');
    })
    .catch((err) => {
      let { error: errorMsg } = err.response.data;
      errorMsg = typeof errorMsg === 'string'
        ? errorMsg
        : 'Error occured while updating recipe';
      return error(errorMsg);
    })
);

export default {};
