import actionTypes from './actionTypes';
import { toastMessage } from '../actions/toasterActions';

import {
  getRecipe,
  getMostUpVotedRecipes,
  downvoteRecipe,
  postRecipeReview,
  getCatalogRecipes,
  upvoteRecipe,
  getUserRecipes,
  deleteUserRecipe,
  addRecipe,
  editRecipe,
} from '../api/recipesApi';
import { hideModal } from './modalActions';

/**
 * @description Sets status for setting popular recipes
 *
 * @param {string} status
 */
export const setPopularStatus = status => (dispatch) => {
  dispatch({
    type: actionTypes.SET_POPULAR_STATUS,
    status,
  });
};

/**
 * @description Calls getMostUpVotedRecipes API and dispatches SET_POPULAR action
 */
export const getPopularRecipes = () => dispatch => (
  getMostUpVotedRecipes(popular => (
    dispatch({
      type: actionTypes.SET_POPULAR,
      popular,
    })), () => dispatch(setPopularStatus('error')))
);

/**
 * @description Sets status for loading recipe view details
 *
 * @param {string} status
 */
export const setRecipeViewStatus = status => (dispatch) => {
  // check status in expected status array
  dispatch({
    type: actionTypes.SET_VIEW_RECIPE_STATUS,
    status,
  });
};

/**
 * @description Calls getRecipe API and dispatches SET_VIEW_RECIPE action
 *
 * @param {number} recipeId
 * @param {number} userId
 */
export const getViewRecipe = (recipeId, userId) => dispatch => (
  getRecipe(recipeId, userId, (recipe) => {
    dispatch({
      type: actionTypes.SET_VIEW_RECIPE,
      recipe,
    });
  }, () => dispatch(setRecipeViewStatus('error')))
);

/**
 * @description Dispatches UNSET_VIEW_RECIPE action
 *
 */
export const clearViewRecipe = () => (dispatch) => {
  dispatch({
    type: actionTypes.UNSET_VIEW_RECIPE,
  });
};

/**
 * @description Calls upvoteRecipe API and dispatches UPVOTE_RECIPE action
 *
 * @param {number} recipeId
 * @param {string} token
 */
export const upvoteARecipe = (recipeId, token) => dispatch => (
  upvoteRecipe(recipeId, token, () => dispatch({
    type: actionTypes.UPVOTE_RECIPE,
    recipeId,
  }), () => dispatch(toastMessage('Could not upvote recipe', 4)))
);

/**
 * @description Calls downvoteRecipe API and dispatches DOWNVOTE_RECIPE action
 *
 * @param {number} recipeId
 * @param {string} token
 */
export const downvoteARecipe = (recipeId, token) => dispatch => (
  downvoteRecipe(recipeId, token, () => (
    dispatch({
      type: actionTypes.DOWNVOTE_RECIPE,
      recipeId,
    })
  ), () => dispatch(toastMessage('Could not downvote recipe', 4)))
);

/**
 * @description Calls postRecipeReview API and dispatches REVIEW_POSTED action
 *
 * @param {number} recipeId
 * @param {string} token
 * @param {string} comment
 */
export const postReview = (recipeId, token, comment) => dispatch => (
  postRecipeReview(recipeId, token, comment, (review) => {
    dispatch({
      type: actionTypes.REVIEW_POSTED,
      review,
    });
    return dispatch(toastMessage('Comment posted successfully', 2));
  }, () => dispatch(toastMessage('Error occured while posting comment', 3)))
);

/**
 * @description Sets status for setting catalog recipes
 *
 * @param {string} status
 */
export const setCatalogRecipesStatus = status => dispatch => dispatch({
  type: actionTypes.SET_CATALOG_RECIPES_STATUS,
  status,
});

/**
 * @description Calls getCatalogRecipes API and dispatches SET_CATALOG_RECIPES action
 *
 * @param {number} pageNo
 * @param {number} pageLimit
 * @param {string} query
 */
export const loadCatalogRecipes = (pageNo, pageLimit, query) => dispatch => (
  getCatalogRecipes(
    pageNo, pageLimit, query,
    (recipes, pagination, isSearch) => dispatch({
      type: actionTypes.SET_CATALOG_RECIPES,
      recipes,
      pagination,
      isSearch,
    }),
    () => dispatch(setCatalogRecipesStatus('error')),
  )
);

/**
 * @description Sets status for setting user recipes
 *
 * @param {any} status
 */
export const setUserRecipesStatus = status => (dispatch) => {
  // check status in expected status array
  dispatch({
    type: actionTypes.SET_USER_RECIPES_STATUS,
    status,
  });
};

/**
 * @description Calls getUserRecipes API and dispatches SET_USER_RECIPES action
 *
 * @param {number} userId
 * @param {number} pageNo
 * @param {number} pageLimit
 */
export const getUserAddedRecipes = (userId, pageNo, pageLimit) => dispatch => (
  getUserRecipes(userId, pageNo, pageLimit, (pagination, recipes) => (
    dispatch({
      type: actionTypes.SET_USER_RECIPES,
      payload: {
        recipes,
        pagination,
      },
    })
  ), () => dispatch(setUserRecipesStatus('error')))
);

/**
 * @description Sets status deleting user recipe
 *
 * @param {any} status
 */
export const setDeleteUserRecipeStatus = status => (dispatch) => {
  // check status in expected status array
  dispatch({
    type: actionTypes.SET_DELETE_USER_RECIPE_STATUS,
    status,
  });
};

/**
 * @description Calls deleteUserRecipe API and dispatches USER_RECIPE_DELETED action
 *
 * @param {string} token
 * @param {number} recipeId
 */
export const deleteUserAddedRecipe = (token, recipeId) => dispatch => (
  deleteUserRecipe(token, recipeId, () => (
    dispatch({
      type: actionTypes.USER_RECIPE_DELETED,
      recipeId,
    })
  ), () => dispatch(setDeleteUserRecipeStatus('error')))
);

/**
 * @description Dispatches SET_MANAGE_RECIPE_ENTRY action
 *
 * @param {string} entry
 * @param {any} value
 */
export const setManageRecipeEntry = (entry, value) => (dispatch) => {
  // check status in expected status array
  dispatch({
    type: actionTypes.SET_MANAGE_RECIPE_ENTRY,
    entry,
    value,
  });
};

/**
 * @description Dispatches SET_MANAGE_RECIPE_ENTRIES action
 *
 * @param {object} entryValuePairs
 */
export const setManageRecipeEntries = entryValuePairs => (dispatch) => {
  // check status in expected status array
  dispatch({
    type: actionTypes.SET_MANAGE_RECIPE_ENTRIES,
    pairs: entryValuePairs,
  });
};

/**
 * @description Dispatches SET_MANAGE_RECIPE_RESET_ENTRIES action
 *
 */
export const resetManageRecipeEntries = () => (dispatch) => {
  // check status in expected status array
  dispatch({
    type: actionTypes.SET_MANAGE_RECIPE_RESET_ENTRIES,
  });
};

/**
 * @description Sets status for managing recipe
 *
 * @param {any} status
 */
export const setManageRecipeStatus = status => (dispatch) => {
  // check status in expected status array
  dispatch({
    type: actionTypes.SET_MANAGE_RECIPE_STATUS,
    status,
  });
};

/**
 * @description Calls addRecipe API and dispatches RECIPE_ADDED action
 *
 * @param {string} token
 * @param {object} formData
 * @param {number} pagelimit
 */
export const addNewRecipe = (token, formData, pageLimit) => dispatch => (
  addRecipe(token, formData, (recipe) => {
    dispatch(getUserAddedRecipes(recipe.userId, 1, pageLimit));
    dispatch({
      type: actionTypes.RECIPE_ADDED,
      recipe,
    });
    dispatch(hideModal());
    dispatch(toastMessage('Recipe added successfully', 4));
  }, error => dispatch(setManageRecipeStatus(error)))
);

/**
 * @description Calls editRecipe API and dispatches RECIPE_UPDATED action
 *
 * @param {string} token
 * @param {number} recipeId
 * @param {object} formData
 */
export const editNewRecipe = (token, recipeId, formData) => dispatch => (
  editRecipe(token, recipeId, formData, (recipe) => {
    dispatch({
      type: actionTypes.RECIPE_UPDATED,
      recipe,
    });
    dispatch(setManageRecipeStatus(true));
  }, error => dispatch(setManageRecipeStatus(error)))
);

export default {};
