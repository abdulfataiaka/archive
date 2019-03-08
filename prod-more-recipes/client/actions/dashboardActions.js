import actionTypes from './actionTypes';

/**
 * @description Dispatches ction for setting dashboard status
 *
 * @param {any} status
 */
export const setDashboardLoading = status => (dispatch) => {
  // check status in expected status array
  dispatch({
    type: actionTypes.SET_DASHBOARD_LOADING,
    loading: status,
  });
};

export default {
  setDashboardLoading,
};
