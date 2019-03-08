import expect from 'expect';
import factory from '../factory';
import userFavorites, { initialState } from '../../reducers/dashboard/userFavorites';
import actionTypes from '../../actions/actionTypes';

import {
} from '../../actions/dashboardActions';

const dispatch = action => userFavorites(initialState, action);

describe('Testing userFavorites reducer', () => {
  it('Should retain only category general as an empty array', (done) => {
    const favoriteId = 1;
    const state = userFavorites({
      ...initialState,
      recipes: {
        general: [],
      },
    }, {
      type: actionTypes.REMOVED_FROM_CATEGORY,
      favoriteId,
    });
    expect(state.recipes).toEqual({ general: [] });
    done();
  });

  it('Should move favorite with Id 200 to the general category', (done) => {
    const favorite = factory.getMock('favorite');
    const favoriteId = 200;
    const state = userFavorites({
      ...initialState,
      recipes: {
        general: [],
        bully: [
          { ...favorite, id: favoriteId },
          { ...favorite, id: favoriteId + 2 },
        ],
      },
    }, {
      type: actionTypes.REMOVED_FROM_CATEGORY,
      favoriteId,
    });
    const res = {
      general: [{ ...favorite, id: favoriteId }],
      bully: [{ ...favorite, id: favoriteId + 2 }],
    };
    expect(state.recipes).toEqual(res);
    done();
  });

  it('Should set recipes to null', (done) => {
    const favoriteId = 1;
    const state = dispatch({
      type: actionTypes.DELETE_FAVORITE,
      favoriteId,
    });
    expect(state.recipes).toEqual(null);
    done();
  });

  it('Should move remove favorite with ID 200 from general', (done) => {
    const favorite = factory.getMock('favorite');
    const favorite2 = {
      ...favorite,
      id: 202,
      recipeId: 30,
      Recipe: {
        ...favorite.Recipe,
        id: 30,
      },
    };
    const state = userFavorites({
      ...initialState,
      recipes: {
        general: [
          { ...favorite },
          { ...favorite2 },
        ],
      },
    }, {
      type: actionTypes.DELETE_FAVORITE,
      recipeId: favorite.Recipe.id,
    });
    const res = {
      general: [{ ...favorite2 }],
    };
    expect(state.recipes).toEqual(res);
    done();
  });

  it('Should set new status to recipeStatus', (done) => {
    const state = dispatch({
      type: actionTypes.SET_USER_FAVORITES_STATUS,
      status: 'new status',
    });
    expect(state.recipesStatus).toEqual('new status');
    done();
  });

  it('Should set state back to initialState', (done) => {
    const state = dispatch({
      type: actionTypes.LOGOUT,
    });
    expect(state).toEqual(initialState);
    done();
  });

  it('Should set new status to recipeStatus', (done) => {
    const state = dispatch({
      type: actionTypes.SET_USER_FAVORITES,
      recipes: [],
    });
    expect(state.recipes).toEqual([]);
    expect(state.recipesStatus).toEqual(null);
    done();
  });
});
