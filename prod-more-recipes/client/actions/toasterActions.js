
import actionTypes from '../actions/actionTypes';

/**
 * @description Dispatches SHOW_TOASTER action with message and timer Id
 *
 * @param {string} message
 * @param {number} timer
 */
const showToasterAction = (message, timer) => ({
  type: actionTypes.SHOW_TOASTER,
  payload: { timer, message },
});

/**
 * @description Dispatches HIDE_TOASTER action
 *
 */
export const hideToaster = () => dispatch => (
  dispatch({
    type: actionTypes.HIDE_TOASTER,
  })
);

/**
 * @description Dispatches SHOW_TOASTER action with message and seconds
 *
 * @param {string} message
 * @param {number} seconds
 */
export const toastMessage = (message, seconds) => (dispatch) => {
  if (typeof seconds !== 'number') return false;
  const timer = setTimeout(() => {
    dispatch(hideToaster());
  }, seconds * 1000);
  return dispatch(showToasterAction(message, timer));
};

export default {
  toastMessage,
  hideToaster,
};
