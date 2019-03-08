import actionTypes from '../actions/actionTypes';

export const initialState = {
  message: null,
  timer: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_TOASTER:
      if (state.timer !== null) {
        clearTimeout(state.timer);
      }
      return action.payload;

    case actionTypes.SHOW_LOADER:
      if (state.timer !== null) {
        clearTimeout(state.timer);
      }
      return {
        ...state,
        message: null,
        timer: null,
      };
    case actionTypes.HIDE_TOASTER:
      if (state.timer !== null) {
        clearTimeout(state.timer);
      }
      return initialState;
    default:
      return state;
  }
};
