import actionTypes from '../actions/actionTypes';

export const initialState = {
  user: null,
  authError: null,
  loggedIn: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTH_ERROR:
      return {
        ...state,
        authError: action.error,
      };
    case actionTypes.AUTH_SUCCESSFUL:
      return {
        ...state,
        user: action.user,
        authError: null,
        loggedIn: true,
      };
    case actionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
