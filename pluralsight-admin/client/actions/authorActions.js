import {
  LOAD_AUTHORS_SUCESS,
  DELETE_AUTHOR_SUCCESS
} from '../helpers/actionTypes';
import AuthorApi from '../mockapi/authorApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusAction';

export const loadAuthorsSuccess = authors => ({
  type: LOAD_AUTHORS_SUCESS,
  authors
});

export const deleteAuthorSuccess = authorId => ({
  type: DELETE_AUTHOR_SUCCESS,
  authorId
});

export const loadAuthors = () => (dispatch) => {
  dispatch(beginAjaxCall());

  return (
    AuthorApi.getAllAuthors()
      .then((authors) => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch((error) => {
        dispatch(ajaxCallError());
        throw error;
      })
  );
};

export const deleteAuthor = authorId => (dispatch) => {
  dispatch(beginAjaxCall());

  return (
    AuthorApi.deleteAuthor(authorId)
      .then(() => {
        dispatch(deleteAuthorSuccess(authorId));
      })
      .catch((error) => {
        dispatch(ajaxCallError());
        throw error;
      })
  );
};
