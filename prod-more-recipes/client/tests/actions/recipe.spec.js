import expect from 'expect';
import moxios from 'moxios';
import factory from '../factory';
import mockStore from '../factory/mockStore';
import windowMock from '../factory/windowMock';

import {
  getPopularRecipes,
  setRecipeViewStatus,
  getViewRecipe,
  clearViewRecipe,
  upvoteARecipe,
  downvoteARecipe,
  postReview,
  loadCatalogRecipes,
  getUserAddedRecipes,
  deleteUserAddedRecipe,
  resetManageRecipeEntries,
  addNewRecipe,
  editNewRecipe,
} from '../../actions/recipeActions';

window.sessionStorage = windowMock.sessionStorage;

describe('Testing recipe actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('Should dispatch SET_POPULAR action with an array popular recipes', (done) => {
    const popular = [];
    moxios.stubRequest('/api/v1/recipes?sort=upvotes&order=desc&count=6', {
      status: 200,
      response: { recipes: [...popular] },
    });
    const store = mockStore({});
    store.dispatch(getPopularRecipes()).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: 'SET_POPULAR',
        popular,
      });
    });
    done();
  });

  it('Should dispatch  action with an array popular recipes', (done) => {
    moxios.stubRequest('/api/v1/recipes?sort=upvotes&order=desc&count=6', {
      status: 500,
      response: { error: 'error' },
    });
    const store = mockStore({});
    store.dispatch(getPopularRecipes()).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: 'SET_POPULAR_STATUS',
        status: 'error',
      });
    });
    done();
  });

  it('Should dispatch SET_VIEW_RECIPE_STATUS action with error status', (done) => {
    const store = mockStore({});
    store.dispatch(setRecipeViewStatus('error'));
    expect(store.getActions()[0]).toEqual({
      type: 'SET_VIEW_RECIPE_STATUS',
      status: 'error',
    });
    done();
  });

  it('Should dispatch SET_VIEW_RECIPE_STATUS action with error status', (done) => {
    const userId = 1;
    const recipeId = 1;
    const recipe = {};
    moxios.stubRequest(`/api/v1/recipes/${recipeId}?userId=${userId}`, {
      status: 200,
      response: { recipe },
    });
    const store = mockStore({});
    store.dispatch(getViewRecipe(recipeId, userId)).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: 'SET_VIEW_RECIPE',
        recipe,
      });
    });
    done();
  });

  it('Should dispatch SET_VIEW_RECIPE_STATUS action with error status', (done) => {
    const userId = 1;
    const recipeId = 1;
    const recipe = {};
    moxios.stubRequest(`/api/v1/recipes/${recipeId}?userId=${userId}`, {
      status: 500,
      response: { error: 'error' },
    });
    const store = mockStore({});
    store.dispatch(getViewRecipe(recipeId, userId)).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: 'SET_VIEW_RECIPE_STATUS',
        status: 'error',
      });
    });
    done();
  });

  it('Should dispatch UNSET_VIEW_RECIPE action', (done) => {
    const store = mockStore({});
    store.dispatch(clearViewRecipe());
    expect(store.getActions()[0].type).toEqual('UNSET_VIEW_RECIPE');
    done();
  });

  it('Should dispatch UPVOTE_RECIPE action with recipeId as payload', (done) => {
    const recipeId = 1;
    moxios.stubRequest(`/api/v1/recipes/${recipeId}/upvote`, {
      status: 200,
      response: { },
    });
    const store = mockStore({});
    store.dispatch(upvoteARecipe(recipeId, 'user token')).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: 'UPVOTE_RECIPE',
        recipeId,
      });
    });
    done();
  });

  it('Should dispatch SET_VIEW_RECIPE_STATUS action with error status', (done) => {
    const recipeId = 1;
    moxios.stubRequest(`/api/v1/recipes/${recipeId}/upvote`, {
      status: 401,
      response: { error: 'error' },
    });
    const store = mockStore({});
    store.dispatch(upvoteARecipe(recipeId, 'user token')).then(() => {
      expect(store.getActions()[0].type).toEqual('SHOW_TOASTER');
      expect(store.getActions()[0].payload.message).toEqual('Could not upvote recipe');
    });
    done();
  });

  it('Should dispatch DOWNVOTE_RECIPE action with recipeId as payload', (done) => {
    const recipeId = 1;
    moxios.stubRequest(`/api/v1/recipes/${recipeId}/downvote`, {
      status: 200,
      response: { },
    });
    const store = mockStore({});
    store.dispatch(downvoteARecipe(recipeId, 'user token')).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: 'DOWNVOTE_RECIPE',
        recipeId,
      });
    });
    done();
  });

  it('Should dispatch SET_VIEW_RECIPE_STATUS action with error status', (done) => {
    const recipeId = 1;
    moxios.stubRequest(`/api/v1/recipes/${recipeId}/downvote`, {
      status: 400,
      response: { },
    });
    const store = mockStore({});
    store.dispatch(downvoteARecipe(recipeId, 'user token')).then(() => {
      expect(store.getActions()[0].type).toEqual('SHOW_TOASTER');
      expect(store.getActions()[0].payload.message).toEqual('Could not downvote recipe');
    });
    done();
  });

  it('Should dispatch SHOW_TOASTER action with error message in payload', (done) => {
    const recipeId = 1;
    moxios.stubRequest(`/api/v1/recipes/${recipeId}/reviews`, {
      status: 400,
      response: { },
    });
    const store = mockStore({});
    store.dispatch(postReview(recipeId, 'user token', 'comment')).then(() => {
      expect(store.getActions()[0].type)
        .toEqual('SHOW_TOASTER');
      expect(store.getActions()[0].payload.message)
        .toEqual('Error occured while posting comment');
    });
    done();
  });

  it('Should dispatch REVIEW_POSTED action', (done) => {
    const recipeId = 1;
    const res = factory.getPostReviewMock();
    moxios.stubRequest(`/api/v1/recipes/${recipeId}/reviews`, {
      status: 200,
      response: { ...res },
    });
    const store = mockStore({});
    store.dispatch(postReview(recipeId, 'user token', 'comment')).then(() => {
      expect(store.getActions()[0].type)
        .toEqual('REVIEW_POSTED');
    });
    done();
  });

  it(
    'Should dispatch SET_CATALOG_RECIPES action with recipes array and pagination',
    (done) => {
      const pageNo = 1;
      const pageLimit = 2;
      const query = '';
      const res = factory.getCatalogRecipesResMock();
      moxios.stubRequest(`/api/v1/recipes?page=${pageNo}&count=${pageLimit}`, {
        status: 200,
        response: { ...res },
      });
      const store = mockStore({});
      store.dispatch(loadCatalogRecipes(pageNo, pageLimit, query)).then(() => {
        expect(store.getActions()[0].type)
          .toEqual('SET_CATALOG_RECIPES');
        expect(Array.isArray(store.getActions()[0].recipes))
          .toEqual(true);
        expect(typeof store.getActions()[0].pagination)
          .toEqual('object');
      });
      done();
    },
  );

  it(
    'Should dispatch SET_CATALOG_RECIPES action with recipes array and pagination',
    (done) => {
      const pageNo = 1;
      const pageLimit = 2;
      const query = '';
      const res = factory.getCatalogRecipesResMock();
      moxios.stubRequest(`/api/v1/recipes?page=${pageNo}&count=${pageLimit}`, {
        status: 200,
        response: { ...res, recipes: null },
      });
      const store = mockStore({});
      store.dispatch(loadCatalogRecipes(pageNo, pageLimit, query)).then(() => {
        expect(store.getActions()[0].type)
          .toEqual('SET_CATALOG_RECIPES_STATUS');
      });
      done();
    },
  );

  it(
    'Should dispatch SET_CATALOG_RECIPES_STATUS action with recipes array and pagination',
    (done) => {
      const pageNo = 1;
      const pageLimit = 2;
      const query = '';
      const res = factory.getCatalogRecipesResMock();
      moxios.stubRequest(`/api/v1/recipes?page=${pageNo}&count=${pageLimit}`, {
        status: 400,
        response: { },
      });
      const store = mockStore({});
      store.dispatch(loadCatalogRecipes(pageNo, pageLimit, query)).then(() => {
        expect(store.getActions()[0].type)
          .toEqual('SET_CATALOG_RECIPES_STATUS');
      });
      done();
    },
  );

  it(
    'Should dispatch SET_USER_RECIPES_STATUS action with error status',
    (done) => {
      const userId = 1;
      const pageNo = 1;
      const pageLimit = 2;
      const query = '';
      const res = factory.getCatalogRecipesResMock();
      moxios.stubRequest(`/api/v1/users/${userId}/recipes?page=${pageNo}&count=${pageLimit}`, {
        status: 400,
        response: { },
      });
      const store = mockStore({});
      store.dispatch(getUserAddedRecipes(userId, pageNo, pageLimit)).then(() => {
        expect(store.getActions()[0])
          .toEqual({
            type: 'SET_USER_RECIPES_STATUS',
            status: 'error',
          });
      });
      done();
    },
  );

  it(
    'Should dispatch SET_USER_RECIPES action with recipes array and pagination',
    (done) => {
      const userId = 1;
      const pageNo = 1;
      const pageLimit = 2;
      const query = '';
      const res = factory.getUserRecipesResMock();
      moxios.stubRequest(`/api/v1/users/${userId}/recipes?page=${pageNo}&count=${pageLimit}`, {
        status: 200,
        response: { ...res },
      });
      const store = mockStore({});
      store.dispatch(getUserAddedRecipes(userId, pageNo, pageLimit)).then(() => {
        expect(store.getActions()[0])
          .toEqual({
            type: 'SET_USER_RECIPES',
            payload: {
              pagination: { ...res.pagination },
              recipes: [...res.recipes],
            },
          });
      });
      done();
    },
  );

  it(
    'Should dispatch USER_RECIPE_DELETED action with recipeId',
    (done) => {
      const recipeId = 1;
      moxios.stubRequest(`/api/v1/recipes/${recipeId}`, {
        status: 200,
        response: { },
      });
      const store = mockStore({});
      store.dispatch(deleteUserAddedRecipe('user token', recipeId)).then(() => {
        expect(store.getActions()[0])
          .toEqual({
            type: 'USER_RECIPE_DELETED',
            recipeId,
          });
      });
      done();
    },
  );

  it(
    'Should dispatch SET_DELETE_USER_RECIPE_STATUS action with error status',
    (done) => {
      const recipeId = 1;
      moxios.stubRequest(`/api/v1/recipes/${recipeId}`, {
        status: 401,
        response: { },
      });
      const store = mockStore({});
      store.dispatch(deleteUserAddedRecipe('user token', recipeId)).then(() => {
        expect(store.getActions()[0])
          .toEqual({
            type: 'SET_DELETE_USER_RECIPE_STATUS',
            status: 'error',
          });
      });
      done();
    },
  );

  it(
    'Should dispatch only the SET_MANAGE_RECIPE_RESET_ENTRIES action',
    (done) => {
      const store = mockStore({});
      store.dispatch(resetManageRecipeEntries());
      expect(store.getActions()[0])
        .toEqual({
          type: 'SET_MANAGE_RECIPE_RESET_ENTRIES',
        });
      done();
    },
  );

  it(
    'Should dispatch RECIPE_ADDED action with recipe info as payload',
    (done) => {
      const recipeInfo = {
        id: 234,
        title: 'title',
        ingredients: 'ing1, ing2',
        procedure: 'procedure',
        recipeImageFile: null,
        uploadImage: 1,
      };
      const res = {
        recipe: {
          ...recipeInfo,
        },
      };
      moxios.stubRequest('/api/v1/recipes', {
        status: 201,
        response: { ...res },
      });
      const store = mockStore({});
      store.dispatch(addNewRecipe('user token', {}, 6)).then(() => {
        expect(store.getActions()[0])
          .toEqual({
            type: 'RECIPE_ADDED',
            recipe: { ...recipeInfo },
          });
      });
      done();
    },
  );

  it(
    'Should dispatch SET_MANAGE_RECIPE_STATUS action with error status',
    (done) => {
      moxios.stubRequest('/api/v1/recipes', {
        status: 400,
        response: { error: 'bad request' },
      });
      const store = mockStore({});
      store.dispatch(addNewRecipe('user token', {}, 6)).then(() => {
        expect(store.getActions()[0])
          .toEqual({
            type: 'SET_MANAGE_RECIPE_STATUS',
            status: 'bad request',
          });
      });
      done();
    },
  );

  it(
    'Should dispatch RECIPE_UPDATED action with updated recipe info',
    (done) => {
      const recipeInfo = {
        id: 234,
        title: 'title',
        ingredients: 'ing1, ing2',
        procedure: 'procedure',
        recipeImageFile: null,
        uploadImage: 0,
      };
      const res = {
        recipe: {
          ...recipeInfo,
        },
      };
      const recipeId = recipeInfo.id;
      moxios.stubRequest(`/api/v1/recipes/${recipeId}`, {
        status: 200,
        response: { ...res },
      });
      const store = mockStore({});
      store.dispatch(editNewRecipe('user token', recipeId, {
        title: recipeInfo.title,
      })).then(() => {
        expect(store.getActions()[0])
          .toEqual({
            type: 'RECIPE_UPDATED',
            recipe: { ...recipeInfo },
          });
      });
      done();
    },
  );

  it(
    'Should dispatch SET_MANAGE_RECIPE_STATUS action with error status',
    (done) => {
      const recipeId = 1;
      moxios.stubRequest(`/api/v1/recipes/${recipeId}`, {
        status: 400,
        response: { error: 'bad request' },
      });
      const store = mockStore({});
      store.dispatch(editNewRecipe('user token', recipeId, {})).then(() => {
        expect(store.getActions()[0])
          .toEqual({
            type: 'SET_MANAGE_RECIPE_STATUS',
            status: 'bad request',
          });
      });
      done();
    },
  );
});
