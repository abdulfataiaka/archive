import { BEGIN_AJAX_CALL, AJAX_CALL_ERROR } from '../helpers/actionTypes';
import { actionTypeEndsInSuccess } from '../helpers/ajaxStatusHelper';
import { ajaxCallsInProgressInitialState } from '../helpers/initialStates';

export default (state = ajaxCallsInProgressInitialState, action) => {
  if (action.type === BEGIN_AJAX_CALL) {
    return state + 1;
  }

  if (action.type === AJAX_CALL_ERROR || actionTypeEndsInSuccess(action.type)) {
    return state - 1;
  }

  return state;
};
