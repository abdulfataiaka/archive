import {
  LOAD_AUTHORS_SUCESS,
  DELETE_AUTHOR_SUCCESS
} from '../helpers/actionTypes';

import { authorsInitialState } from '../helpers/initialStates';

export default (state = authorsInitialState, action) => {
  switch (action.type) {
    case LOAD_AUTHORS_SUCESS:
      return action.authors;
    case DELETE_AUTHOR_SUCCESS:
      return state.filter(author => author.id !== action.authorId);
    default:
      return state;
  }
};
