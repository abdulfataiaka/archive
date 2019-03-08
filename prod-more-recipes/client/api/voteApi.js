import axios from 'axios';

/**
 * @description Makes a GET request to get user vote for recipe
 *
 * @param {string} token
 * @param {number} recipeId
 * @param {function} success
 * @param {function} error
 *
 * @returns {Promise} axios
 */
export const getUserVote = (token, recipeId, success, error) => (
  axios.get(`/api/v1/recipes/${recipeId}/vote`, {
    headers: { 'x-user-token': token },
  })
    .then((response) => {
      const { vote } = response.data;
      if (vote !== null && typeof vote === 'object') return success(vote);
      return error('invalid response from server');
    })
    .catch((err) => {
      error(err);
    })
);

export default {
  getUserVote,
};
