import actionTypes from './actionTypes';

import {
  getUser,
} from '../api/userApi';

/**
 * @description Sets status for getting user details
 *
 * @param {string} status
 */
export const setGetUserDetailsStatus = status => (dispatch) => {
  // check status in expected status array
  if ([
    'loading',
    'error',
  ].includes(status.toLowerCase())) {
    dispatch({
      type: actionTypes.SET_USER_DETAILS_STATUS,
      status: status.toLowerCase(),
    });
  }
};

/**
 * @description Calls getUser API and dispatches SET_USER_DETAILS action
 *
 * @param {number} userId
 */
export const getUserDetails = userId => dispatch => (
  getUser(userId, userDetails => dispatch({
    type: actionTypes.SET_USER_DETAILS,
    userDetails,
  }), () => dispatch(setGetUserDetailsStatus('error')))
);

export default {
  getUserDetails,
  setGetUserDetailsStatus,
};
