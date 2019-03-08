import actionTypes from '../../actions/actionTypes';

export const initialState = {
  dashboardLoading: false,
  userReady: false,
};
// actionTypes.FAVORITE_REMOVED_FROM_CATEGORY
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_FAILED:
      return {
        ...state,
        userReady: true,
      };
    case actionTypes.AUTH_SUCCESSFUL:
      return {
        ...state,
        userReady: true,
      };
    case actionTypes.LOGOUT:
      return initialState;

    case actionTypes.SET_DASHBOARD_LOADING:
      return {
        ...state,
        dashboardLoading: action.loading === true,
      };
    default:
      return state;
  }
};
