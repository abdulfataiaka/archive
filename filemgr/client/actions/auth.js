import { SET_AUTH_VIEW_TYPE } from '../helpers/actionTypes';

export const setAuthViewType = value => dispatch => dispatch({
  type: SET_AUTH_VIEW_TYPE,
  viewType: value
});

