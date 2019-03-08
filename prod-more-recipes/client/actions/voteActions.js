import actionTypes from './actionTypes';

import {
  getUserVote,
} from '../api/voteApi';

/**
 * @description Calls getUserVote API and dispatches SET_USER_VIEW_VOTE action on success
 *
 * @param {string} token
 * @param {number} recipeId
 */
export const setUserVoteForView = (token, recipeId) => dispatch => (
  getUserVote(token, recipeId, vote => (
    dispatch({
      type: actionTypes.SET_USER_VIEW_VOTE,
      vote,
    })
  ), () => (
    dispatch({
      type: actionTypes.SET_USER_VIEW_VOTE,
      vote: null,
    })
  ))
);

export default {
  setUserVoteForView,
};
