import actionTypes from './actionTypes';

import {
  getCategories,
  deleteCategory,
  addCategory,
  removeFavoriteFromCategory,
  addFavoriteToCategory,
} from '../api/categoriesApi';

import {
  setUserFavoritesStatus,
} from './favoriteActions';

import { toastMessage } from '../actions/toasterActions';

/**
 * @description Sets either loading or error in state after getting user categories
 *
 * @param {string} status
 */
export const setGetCategoriesStatus = status => (dispatch) => {
  // check status in expected status array
  if ([
    'loading',
    'error',
  ].includes(status)) {
    dispatch({
      type: actionTypes.SET_USER_CATEGORIES_STATUS,
      status,
    });
  }
};

/**
 * @description Gets user categories and dispatch SET_USER_CATEGORIES action
 *
 * @param {string} token
 */
export const getUserCategories = token => dispatch => (
  getCategories(token, categories => dispatch({
    type: actionTypes.SET_USER_CATEGORIES,
    categories,
  }), () => dispatch(setGetCategoriesStatus('error')))
);

/**
 * @description Sets status for delete category
 *
 * @param {any} status
 */
export const setDeleteCategoryStatus = status => (dispatch) => {
  // check status in expected status array
  if (status === null || status === true || status === false) {
    dispatch({
      type: actionTypes.SET_CATEGORY_DELETE_STATUS,
      status,
    });
  }
};

/**
 * @description Calls deleteCategory API and dispatches USER_CATEGORY_DELETED action
 *
 * @param {string} token
 * @param {number} categoryId
 */
export const deleteACategory = (token, categoryId) => dispatch => (
  deleteCategory(token, categoryId, () => {
    dispatch({
      type: actionTypes.USER_CATEGORY_DELETED,
      categoryId,
    });
    dispatch(setUserFavoritesStatus('loading'));
  }, () => {
    dispatch(setDeleteCategoryStatus(false));
    return dispatch(toastMessage('Unable to delete catagory', 3));
  })
);

/**
 * @description Sets status for add category
 *
 * @param {string} status
 */
export const setAddCategoryStatus = status => (dispatch) => {
  // check status in expected status array
  if ([
    null,
    'loading',
    'error',
  ].includes(status)) {
    dispatch({
      type: actionTypes.SET_ADD_CATEGORY_STATUS,
      status,
    });
  }
};

/**
 * @description Calls removeFromCategory API and dispatches REMOVED_FROM_CATEGORY action
 *
 * @param {string} token
 * @param {number} favoriteId
 */
export const removeFromCategory = (token, favoriteId) => dispatch => (
  removeFavoriteFromCategory(token, favoriteId, () => {
    dispatch({
      type: actionTypes.REMOVED_FROM_CATEGORY,
      favoriteId,
    });
    dispatch(toastMessage('Favorite removed from category', 3));
  }, () => dispatch(toastMessage('Could not remove from category', 3)))
);

/**
 * @description Sets status for add to category
 *
 * @param {string} status
 */
export const setAddToCategoryStatus = status => dispatch => (
  // check status in expected status array
  dispatch({
    type: actionTypes.SET_ADD_TO_CATEGORY_STATUS,
    status,
  })
);

/**
 * @description Calls addFavoriteToCategory API and dispatches setAddToCategoryStatus action
 *
 * @param {string} token
 * @param {number} favoriteId
 * @param {number} categoryId
 */
export const addToCategory = (token, favoriteId, categoryId) => dispatch => (
  addFavoriteToCategory(token, favoriteId, categoryId, () => {
    dispatch(setAddToCategoryStatus(true));
  }, () => {
    dispatch(toastMessage('Unable to add favorite to category', 3));
  })
);

/**
 * @description Calls addCategory API and dispatches CATEGORY_ADDED action
 *
 * @param {string} token
 * @param {string} categoryName
 */
export const addACategory = (token, categoryName) => dispatch => (
  addCategory(token, categoryName, (newCategory) => {
    dispatch({
      type: actionTypes.CATEGORY_ADDED,
      newCategory,
    });
  }, () => {
    dispatch(setAddCategoryStatus('error'));
    dispatch(toastMessage('Unable to add catagory', 3));
  })
);

export default {};
