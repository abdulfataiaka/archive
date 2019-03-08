import actionTypes from './actionTypes';
import modalTypes from '../components/Modal/modalTypes';

const modalExists = modal => Object.values(modalTypes).includes(modal);

/**
 * @description Dispatches OPEN_MODAL action with specified modal and options
 *
 * @param {string} modal
 * @param {object} options
 */
export const openModal = (modal, options) => (dispatch) => {
  let useOptions = options;
  if (useOptions === null || typeof useOptions !== 'object') {
    useOptions = null;
  }
  if (modalExists(modal)) {
    dispatch({
      type: actionTypes.OPEN_MODAL,
      modal,
      options: useOptions,
    });
    return true;
  }
  return false;
};

/**
 * @description Dispatches HIDE_MODAL action to hide modal
 *
 * @param {string} modal
 * @param {object} options
 */
export const hideModal = () => dispatch => dispatch({
  type: actionTypes.HIDE_MODAL,
});

export default {
  openModal,
  hideModal,
};

