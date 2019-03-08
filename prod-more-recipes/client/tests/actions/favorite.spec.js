import expect from 'expect';
import moxios from 'moxios';
import factory from '../factory';
import mockStore from '../factory/mockStore';
import windowMock from '../factory/windowMock';

import {
  addAsFavorite,
  deleteFavorite,
  setUserFavoriteIds,
  getUserFavorites,
} from '../../actions/favoriteActions';

describe('Testing favorite actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('Should dispatch ADD_FAVORITE action with recipeId', (done) => {
    const recipeId = 1;
    const userId = 1;
    const res = {};
    moxios.stubRequest('/api/v1/users/favorites', {
      status: 200,
      response: { ...res },
    });
    const store = mockStore({});
    store.dispatch(addAsFavorite(userId, recipeId, 'user token')).then(() => {
      expect(store.getActions()[0])
        .toEqual({
          type: 'ADD_FAVORITE',
          payload: recipeId,
        });
    });
    done();
  });

  it('Should dispatch SHOW_TOASTER action with error message', (done) => {
    const recipeId = 1;
    const userId = 1;
    const res = {};
    moxios.stubRequest('/api/v1/users/favorites', {
      status: 400,
      response: { ...res },
    });
    const store = mockStore({});
    store.dispatch(addAsFavorite(userId, recipeId, 'user token')).then(() => {
      expect(store.getActions()[0].type).toEqual('SHOW_TOASTER');
      expect(store.getActions()[0].payload.message).toEqual('Unable to add recipe as favorite');
    });
    done();
  });

  it('Should dispatch DELETE_FAVORITE action with recipeId', (done) => {
    const recipeId = 1;
    const userId = 1;
    const res = {};
    moxios.stubRequest('/api/v1/users/favorites', {
      status: 200,
      response: { ...res },
    });
    const store = mockStore({});
    store.dispatch(deleteFavorite(userId, recipeId, 'user token')).then(() => {
      expect(store.getActions()[0])
        .toEqual({
          type: 'DELETE_FAVORITE',
          recipeId,
        });
    });
    done();
  });

  it('Should dispatch SHOW_TOASTER action with error message', (done) => {
    const recipeId = 1;
    const userId = 1;
    const res = {};
    moxios.stubRequest('/api/v1/users/favorites', {
      status: 400,
      response: { ...res },
    });
    const store = mockStore({});
    store.dispatch(deleteFavorite(userId, recipeId, 'user token')).then(() => {
      expect(store.getActions()[0].type).toEqual('SHOW_TOASTER');
      expect(store.getActions()[0].payload.message).toEqual('Unable to remove favorite recipe');
    });
    done();
  });

  it('Should dispatch SET_FAVORITES action with array of favorite Ids', (done) => {
    const recipeId = 1;
    const userId = 1;
    const res = {
      recipeIds: [10, 12],
    };
    moxios.stubRequest(`/api/v1/users/${userId}/favorites/ids`, {
      status: 200,
      response: { ...res },
    });
    const store = mockStore({});
    store.dispatch(setUserFavoriteIds(userId)).then(() => {
      expect(store.getActions()[0])
        .toEqual({
          type: 'SET_FAVORITES',
          payload: [10, 12],
        });
    });
    done();
  });

  it('Should dispatch SET_FAVORITES action with empty array of favorite Ids', (done) => {
    const userId = null;
    const store = mockStore({});
    store.dispatch(setUserFavoriteIds(userId));
    expect(store.getActions()[0])
      .toEqual({
        type: 'SET_FAVORITES',
        payload: [],
      });
    done();
  });

  it('Should dispatch SET_FAVORITES action with empty array of favorite Ids', (done) => {
    const userId = undefined;
    const store = mockStore({});
    store.dispatch(setUserFavoriteIds(userId));
    expect(store.getActions()[0])
      .toEqual({
        type: 'SET_FAVORITES',
        payload: [],
      });
    done();
  });

  it('Should dispatch SET_USER_FAVORITES_STATUS with error status', (done) => {
    const userId = undefined;
    const store = mockStore({});
    store.dispatch(getUserFavorites(userId, []));
    expect(store.getActions()[0])
      .toEqual({
        type: 'SET_USER_FAVORITES_STATUS',
        status: 'error',
      });
    done();
  });

  it('Should dispatch SET_USER_FAVORITES with an empty favorites array', (done) => {
    const userId = null;
    const store = mockStore({});
    store.dispatch(getUserFavorites(userId, []));
    expect(store.getActions()[0])
      .toEqual({
        type: 'SET_USER_FAVORITES',
        recipes: {
          general: [],
        },
      });
    done();
  });

  it('Should dispatch SET_USER_FAVORITES action with array of categorised favorites', (done) => {
    const recipeId = 1;
    const userId = 1;
    const res = {
      recipes: [],
    };
    moxios.stubRequest(`/api/v1/users/${userId}/favorites`, {
      status: 200,
      response: { ...res },
    });
    const store = mockStore({});
    store.dispatch(getUserFavorites(userId, [])).then(() => {
      expect(store.getActions()[0])
        .toEqual({
          type: 'SET_USER_FAVORITES',
          recipes: {
            general: [],
          },
        });
    });
    done();
  });
});
