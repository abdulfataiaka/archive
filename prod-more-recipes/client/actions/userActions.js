import actionTypes from './actionTypes';

import { setUserFavoriteIds } from '../actions/favoriteActions';
import { toastMessage } from '../actions/toasterActions';
import { hideModal } from '../actions/modalActions';

import {
  updatePersonalDetails,
  changePassword,
  verifyUser,
  login,
  register,
} from '../api/userApi';

/**
 * @description Remove user form sessionStorage and dispatches LOGOUT action
 *
 */
export const logout = () => (dispatch) => {
  window.sessionStorage.removeItem('user');
  dispatch(toastMessage('You are logged out', 4));
  dispatch({
    type: actionTypes.LOGOUT,
  });
};

/**
 * @description Sets error for failed authentication
 *
 * @param {any} error
 */
export const setAuthError = error => dispatch => dispatch({
  type: actionTypes.SET_AUTH_ERROR,
  error,
});

/**
 * @description Calls register API and dispatches AUTH_SUCCESSFUL action
 *
 * @param {object} userDetails
 */
export const registerUser = userDetails => dispatch => (
  register(
    userDetails,
    (user) => {
      window.sessionStorage.setItem('user', JSON.stringify(user));
      dispatch({
        type: actionTypes.AUTH_SUCCESSFUL,
        user,
      });
      dispatch(toastMessage(`You are registered as ${user.username}`, 4));
      dispatch(hideModal());
      return dispatch({
        type: actionTypes.SET_FAVORITES,
        payload: [],
      });
    }, error => dispatch(setAuthError(error)),
  )
);

/**
 * @description Calls login API and dispatches AUTH_SUCCESSFUL action
 *
 * @param {object} credentials
 */
export const loginUser = credentials => dispatch => (
  login(
    credentials,
    (user) => {
      window.sessionStorage.setItem('user', JSON.stringify(user));
      dispatch({
        type: actionTypes.AUTH_SUCCESSFUL,
        user,
      });
      dispatch(toastMessage(`You are logged in as ${user.username}`, 4));
      dispatch(hideModal());
      dispatch(setUserFavoriteIds(user.userId));
    }, error => dispatch(setAuthError(error)),
  )
);

/**
 * @description Gets user from sessionStorage and Calls verifyUser API to verify user
 *
 */
export const authInitOnLoad = () => (dispatch) => {
  let user = window.sessionStorage.getItem('user');
  user = JSON.parse(user);
  if (user !== null && typeof user === 'object') {
    const { userId, username, token } = user;
    return verifyUser(userId, username, token, () => {
      dispatch({
        type: actionTypes.AUTH_SUCCESSFUL,
        user,
      });
      dispatch(setUserFavoriteIds(user.userId));
    }, () => {
      dispatch(logout());
    });
  }
  return dispatch({ type: actionTypes.AUTH_FAILED });
};

/**
 * @description Sets status for updating user password
 *
 * @param {any} status
 */
export const setUpdateUserPasswordStatus = status => (dispatch) => {
  // check status in expected status array
  dispatch({
    type: actionTypes.SET_USER_PASSWORD_STATUS,
    status,
  });
};

/**
 * @description Calls changePassword API and dispatches
 * setUpdateUserPasswordStatus action creator on success
 *
 * @param {string} token
 * @param {string} currentPassword
 * @param {string} newPassword
 */
export const updateUserPassword = (token, currentPassword, newPassword) => dispatch => (
  changePassword(
    token, currentPassword, newPassword,
    () => dispatch(setUpdateUserPasswordStatus(true)),
    error => dispatch(setUpdateUserPasswordStatus(error)),
  )
);

/**
 * @description Sets status for updating user personal details
 *
 * @param {any} status
 */
export const setUpdatePersonalDetailsStatus = status => (dispatch) => {
  // check status in expected status array
  dispatch({
    type: actionTypes.SET_PERSONAL_DETAILS_UPDATE_STATUS,
    status,
  });
};


/**
 * @description Calls updatePersonalDetails API and dispatches
 * PERSONAL_DETAILS_UPDATED action on success
 *
 * @param {string} token
 * @param {object} user
 */
export const updateUserPersonalDetails = (token, user) => dispatch => (
  updatePersonalDetails(token, user, newUser => (
    dispatch({
      type: actionTypes.PERSONAL_DETAILS_UPDATED,
      userDetails: newUser,
    })), error => dispatch(setUpdatePersonalDetailsStatus(error)))
);

export default {
  logout,
  loginUser,
  setAuthError,
  registerUser,
  setUpdateUserPasswordStatus,
  updateUserPassword,
  setUpdatePersonalDetailsStatus,
  updateUserPersonalDetails,
};
