import actionTypes from '../actions/actionTypes';

export const initialState = {
  open: false,
  modal: null,
  options: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_MODAL:
      return {
        open: true,
        modal: action.modal,
        options: action.options,
      };
    case actionTypes.HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
};
