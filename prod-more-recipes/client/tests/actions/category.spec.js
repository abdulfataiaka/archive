import expect from 'expect';
import moxios from 'moxios';
import factory from '../factory';
import mockStore from '../factory/mockStore';
import windowMock from '../factory/windowMock';

import {
  setGetCategoriesStatus,
  getUserCategories,
  setDeleteCategoryStatus,
  deleteACategory,
  setAddCategoryStatus,
  removeFromCategory,
  addACategory,
} from '../../actions/categoryActions';

describe('Testing dashboard actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('Should dispatch SET_USER_CATEGORIES_STATUS action with loading status', (done) => {
    const store = mockStore({});
    store.dispatch(setGetCategoriesStatus('loading'));
    expect(store.getActions()[0]).toEqual({
      type: 'SET_USER_CATEGORIES_STATUS',
      status: 'loading',
    });
    done();
  });

  it('Should dispatch SET_USER_CATEGORIES_STATUS action with error status', (done) => {
    const store = mockStore({});
    store.dispatch(setGetCategoriesStatus('error'));
    expect(store.getActions()[0]).toEqual({
      type: 'SET_USER_CATEGORIES_STATUS',
      status: 'error',
    });
    done();
  });

  it('Should dispatch the SET_USER_CATEGORIES_STATUS action with error', (done) => {
    const userId = 1;
    const categories = [];
    moxios.stubRequest(`/api/v1/users/${userId}/categories`, {
      status: 400,
      response: { },
    });
    const store = mockStore({});
    store.dispatch(getUserCategories(userId)).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: 'SET_USER_CATEGORIES_STATUS',
        status: 'error',
      });
    });
    done();
  });

  it('Should dispatch the SET_USER_CATEGORIES action with array of categories', (done) => {
    const userId = 1;
    const categories = [];
    moxios.stubRequest(`/api/v1/users/${userId}/categories`, {
      status: 200,
      response: { categories },
    });
    const store = mockStore({});
    store.dispatch(getUserCategories(userId)).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: 'SET_USER_CATEGORIES',
        categories,
      });
    });
    done();
  });

  it('Should dispatch the SET_CATEGORY_DELETE_STATUS action with status(true)', (done) => {
    const store = mockStore({});
    store.dispatch(setDeleteCategoryStatus(true));
    expect(store.getActions()[0]).toEqual({
      type: 'SET_CATEGORY_DELETE_STATUS',
      status: true,
    });
    done();
  });

  it('Should dispatch the SET_CATEGORY_DELETE_STATUS action with status(null)', (done) => {
    const store = mockStore({});
    store.dispatch(setDeleteCategoryStatus(null));
    expect(store.getActions()[0]).toEqual({
      type: 'SET_CATEGORY_DELETE_STATUS',
      status: null,
    });
    done();
  });

  it('Should dispatch the SET_CATEGORY_DELETE_STATUS action with status(false)', (done) => {
    const store = mockStore({});
    store.dispatch(setDeleteCategoryStatus(false));
    expect(store.getActions()[0]).toEqual({
      type: 'SET_CATEGORY_DELETE_STATUS',
      status: false,
    });
    done();
  });

  it('Should dispatch the SET_CATEGORY_DELETE_STATUS and SHOW_TOASTER actions', (done) => {
    const categoryId = 2;
    const store = mockStore({});
    moxios.stubRequest(`/api/v1/categories/${categoryId}`, {
      status: 400,
      response: { },
    });
    store.dispatch(deleteACategory(
      'user token',
      categoryId,
    )).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: 'SET_CATEGORY_DELETE_STATUS',
        status: false,
      });
      expect(store.getActions()[1].type).toEqual('SHOW_TOASTER');
      expect(store.getActions()[1].payload.message).toEqual('Unable to delete catagory');
    });
    done();
  });

  it('Should dispatch the USER_CATEGORY_DELETED action', (done) => {
    const categoryId = 2;
    const store = mockStore({});
    const res = factory.getAddCategoryResMock();
    moxios.stubRequest(`/api/v1/categories/${categoryId}`, {
      status: 200,
      response: { ...res },
    });
    store.dispatch(deleteACategory(
      'user token',
      categoryId,
    )).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: 'USER_CATEGORY_DELETED',
        categoryId,
      });
    });
    done();
  });

  it('Should dispatch SET_ADD_CATEGORY_STATUS action', (done) => {
    const store = mockStore({});
    store.dispatch(setAddCategoryStatus('error'));
    expect(store.getActions()[0]).toEqual({
      type: 'SET_ADD_CATEGORY_STATUS',
      status: 'error',
    });
    done();
  });

  it('Should dispatch SET_ADD_CATEGORY_STATUS action with loading status', (done) => {
    const store = mockStore({});
    store.dispatch(setAddCategoryStatus(null));
    expect(store.getActions()[0]).toEqual({
      type: 'SET_ADD_CATEGORY_STATUS',
      status: null,
    });
    done();
  });

  it('Should dispatch SET_ADD_CATEGORY_STATUS action with null status', (done) => {
    const store = mockStore({});
    store.dispatch(setAddCategoryStatus('loading'));
    expect(store.getActions()[0]).toEqual({
      type: 'SET_ADD_CATEGORY_STATUS',
      status: 'loading',
    });
    done();
  });

  it('Should dispatch REMOVED_FROM_CATEGORY action with favoriteId', (done) => {
    const favoriteId = 2;
    const store = mockStore({});
    moxios.stubRequest('/api/v1/categories/remove', {
      status: 200,
      response: { },
    });
    store.dispatch(removeFromCategory(
      'user token',
      favoriteId,
    )).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: 'REMOVED_FROM_CATEGORY',
        favoriteId,
      });
    });
    done();
  });

  it('Should dispatch SHOW_TOASTER action with an error message in payload', (done) => {
    const favoriteId = 2;
    const store = mockStore({});
    moxios.stubRequest('/api/v1/categories/remove', {
      status: 400,
      response: { },
    });
    store.dispatch(removeFromCategory(
      'user token',
      favoriteId,
    )).then(() => {
      expect(store.getActions()[0].type).toEqual('SHOW_TOASTER');
      expect(store.getActions()[0].payload.message).toEqual('Could not remove from category');
    });
    done();
  });

  it('Should dispatch CATEGORY_ADDED action with new category details', (done) => {
    const categoryName = 'Breakfast';
    const res = factory.getAddCategResMock();
    const store = mockStore({});
    moxios.stubRequest('/api/v1/categories/', {
      status: 201,
      response: { ...res },
    });
    store.dispatch(addACategory(
      'user token',
      categoryName,
    )).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: 'CATEGORY_ADDED',
        newCategory: {
          ...res.category,
        },
      });
    });
    done();
  });

  it('Should dispatch CATEGORY_ADDED action with new category details', (done) => {
    const categoryName = 'Breakfast';
    const store = mockStore({});
    moxios.stubRequest('/api/v1/categories/', {
      status: 400,
      response: { error: 'error occured' },
    });
    store.dispatch(addACategory(
      'user token',
      categoryName,
    )).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: 'SET_ADD_CATEGORY_STATUS',
        status: 'error',
      });
    });
    done();
  });
});
