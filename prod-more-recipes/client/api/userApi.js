import axios from 'axios';
import { resolveStatusCode } from '../utils';

/**
 * @description Makes a POST request to verify session user
 *
 * @param {number} userId
 * @param {string} username
 * @param {string} token
 * @param {function} success
 * @param {function} error
 */
export const verifyUser = (userId, username, token, success, error) => (
  axios.post('/api/v1/users/client/verify', {
    userId, username,
  }, {
    headers: {
      'x-user-token': token,
    },
  })
    .then((response) => {
      if (response.data.verificationStatus) {
        return success();
      }
      return error();
    })
    .catch(() => error())
);

const userForStore = (info) => {
  if (info === null || typeof info !== 'object') return null;
  const { token, user } = info;
  const { userId, username, avatar } = user;
  return {
    userId,
    username,
    token,
    avatar,
  };
};

/**
 * @description Makes a POST request to login a user
 *
 * @param {object} credentials
 * @param {function} success
 * @param {funciton} error
 */
export const login = (credentials, success, error) => (
  axios.post('/api/v1/users/signin', credentials)
    .then((response) => {
      const user = userForStore(response.data);
      return user !== null ? success(user) : error('Unknown error occured');
    })
    .catch((err) => {
      const { data, status } = err.response;
      let { error: errorMsg } = data;
      if (typeof errorMsg !== 'string' || errorMsg.length <= 0) {
        errorMsg = resolveStatusCode(status, 'Unknown error occured');
      }
      return error(errorMsg);
    })
);

/**
 * @description Makes a POST request to register a user
 *
 * @param {object} user
 * @param {function} success
 * @param {funciton} error
 */
export const register = (user, success, error) => (
  axios.post('/api/v1/users/signup', user)
    .then((response) => {
      const newUser = userForStore(response.data);
      return user !== null ? success(newUser) : error('Unknown error occured');
    })
    .catch((err) => {
      const { data, status } = err.response;
      let { error: errorMsg } = data;
      if (typeof errorMsg !== 'string' || errorMsg.length <= 0) {
        errorMsg = resolveStatusCode(status, 'Unknown error occured');
      }
      return error(errorMsg);
    })
);

/**
 * @description Makes a GET request to get user details
 *
 * @param {number} userId
 * @param {function} success
 * @param {function} error
 */
export const getUser = (userId, success, error) => (
  axios.get(`/api/v1/users/${userId}`)
    .then((response) => {
      const { user } = response.data;
      if (user !== null && typeof user === 'object') {
        return success(user);
      }
      return error(null);
    })
    .catch(() => error(null))
);


/**
 * @description Makes a PUT request to change user password
 *
 * @param {string} token
 * @param {string} currentPassword
 * @param {string} newPassword
 * @param {function} success
 * @param {function} error
 */
export const changePassword = (token, currentPassword, newPassword, success, error) => (
  axios.put('/api/v1/users/password', {
    currentPassword,
    newPassword,
  }, { headers: { 'x-user-token': token } })
    .then(() => success())
    .catch((errorObj) => {
      let errorMsg = errorObj.response.data.error;
      errorMsg = typeof errorMsg === 'string' ? errorMsg : 'Unknown error occured';
      return error(errorMsg);
    })
);


/**
 * @description Makes a PUT request to update user personal details
 *
 * @param {string} token
 * @param {object} user
 * @param {funciton} success
 * @param {function} error
 */
export const updatePersonalDetails = (token, newUser, success, error) => (
  axios.put('/api/v1/users/personal', newUser, {
    headers: { 'x-user-token': token },
  })
    .then((response) => {
      const { user } = response.data;
      if (user !== null && typeof user === 'object') return success(user);
      return error('Unknown error occured');
    })
    .catch((errorObj) => {
      let { error: errorMsg } = errorObj.response.data;
      errorMsg = typeof errorMsg === 'string' ? errorMsg : 'Unknown error occured';
      return error(errorMsg);
    })
);

export default {
  verifyUser,
  getUser,
  register,
  login,
  updatePersonalDetails,
  changePassword,
};
