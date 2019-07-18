import { SET_AUTH_VIEW_TYPE } from '../helpers/actionTypes';
import { auth as initialState } from '../helpers/initialStates';

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_AUTH_VIEW_TYPE: return {
      ...state,
      viewType: action.viewType
    }

    default: return state;
  }
};
