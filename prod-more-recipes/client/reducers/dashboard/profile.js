import actionTypes from '../../actions/actionTypes';

export const initialState = {
  userDetails: null,
  // 'loading' | 'error' | null
  userDetailsStatus: null,

  // true | null | error
  userDetailsUpdateStatus: null,
  userPasswordUpdateStatus: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_PASSWORD_STATUS:
      return {
        ...state,
        userPasswordUpdateStatus: action.status,
      };
    case actionTypes.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.userDetails,
        userDetailsStatus: null,
      };
    case actionTypes.SET_USER_DETAILS_STATUS:
      return {
        ...state,
        userDetailsStatus: action.status,
      };
    case actionTypes.SET_PERSONAL_DETAILS_UPDATE_STATUS:
      return {
        ...state,
        userDetailsUpdateStatus: action.status,
      };
    case actionTypes.LOGOUT:
      return initialState;

    case actionTypes.PERSONAL_DETAILS_UPDATED:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          name: action.userDetails.name,
          email: action.userDetails.email,
          gender: action.userDetails.gender,
        },
        userDetailsStatus: null,
        userDetailsUpdateStatus: true,
      };
    default:
      return state;
  }
};
