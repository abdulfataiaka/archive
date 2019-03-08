import actionTypes from '../../actions/actionTypes';
import factory from './index';

const authUserA = factory.getMock('authUserA');

export const logoutMock = { type: actionTypes.LOGOUT };
export const authFailedMock = { type: actionTypes.AUTH_FAILED };

export const setUpdatePwdStatusMock = status => ({
  type: actionTypes.SET_USER_PASSWORD_STATUS,
  status,
});

export const setPersonalStatusMock = status => ({
  type: actionTypes.SET_PERSONAL_DETAILS_UPDATE_STATUS,
  status,
});

export const personalUpdatedMock = user => ({
  type: actionTypes.PERSONAL_DETAILS_UPDATED,
  userDetails: {
    ...user,
  },
});

export const modalMocker = hide => (
  (hide === 'hide') ? (
    { type: actionTypes.HIDE_MODAL }
  ) : null
);

export const authMocker = (type, opts = {}) => {
  const options = (
    opts === null || typeof opts !== 'object'
  ) ? {} : opts;

  switch (type) {
    case 'error':
      return (options.error)
        ? ({
          type: actionTypes.SET_AUTH_ERROR,
          error: options.error,
        })
        : null;

    case 'authSuccess':
      if (options.user === 'A') {
        return {
          type: actionTypes.AUTH_SUCCESSFUL,
          user: { ...authUserA.authPayload },
        };
      }
      return null;
    default: return null;
  }
};

export const favMocker = (type) => {
  switch (type) {
    case 'freshSet':
      return {
        type: actionTypes.SET_FAVORITES,
        payload: [],
      };
    default: return null;
  }
};

export default {};
