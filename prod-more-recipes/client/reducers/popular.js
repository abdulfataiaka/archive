import actionTypes from '../actions/actionTypes';

export const initialState = {
  popular: null,
  popularStatus: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_POPULAR:
      return {
        popular: action.popular,
        popularStatus: null,
      };
    case actionTypes.SET_POPULAR_STATUS:
      return {
        ...state,
        popularStatus: action.status,
      };
    default:
      return state;
  }
};
