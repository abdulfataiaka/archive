import actionTypes from '../actions/actionTypes';

const initialState = {
  visible: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_LOADER:
      return {
        ...state,
        visible: true,
      };
    // To prevent overlapping
    case actionTypes.SHOW_TOASTER:
      return {
        ...state,
        visible: false,
      };
    default:
      return state;
  }
};
