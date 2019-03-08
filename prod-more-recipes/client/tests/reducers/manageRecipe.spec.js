import expect from 'expect';
import factory from '../factory';
import manageRecipe, { initialState } from '../../reducers/dashboard/manageRecipe';
import actionTypes from '../../actions/actionTypes';

const dispatch = action => manageRecipe(initialState, action);
const recipe = factory.getMock('recipe');

describe('Testing manageRecipe reducer', () => {
  it('Should', (done) => {
    const state = dispatch({
      type: actionTypes.RECIPE_ADDED,
    });
    expect(state.manageRecipeStatus).toEqual(true);
    done();
  });

  it('Should', (done) => {
    const state = dispatch({
      type: actionTypes.RECIPE_UPDATED,
    });
    expect(state.manageRecipeStatus).toEqual(true);
    done();
  });

  it('Should', (done) => {
    const state = dispatch({
      type: actionTypes.SET_MANAGE_RECIPE_STATUS,
      status: 'test status',
    });
    expect(state.manageRecipeStatus).toEqual('test status');
    done();
  });

  it('Should', (done) => {
    const state = dispatch({
      type: actionTypes.SET_MANAGE_RECIPE_RESET_ENTRIES,
    });
    expect(state).toEqual(initialState);
    done();
  });

  it('Should set state back to initialState', (done) => {
    const state = dispatch({
      type: actionTypes.LOGOUT,
    });
    expect(state).toEqual(initialState);
    done();
  });

  it('Should', (done) => {
    const state = dispatch({
      type: actionTypes.SET_MANAGE_RECIPE_ENTRY,
      entry: 'title',
      value: 'new recipe',
    });
    expect(state.title).toEqual('new recipe');
    done();
  });

  it('Should make no changes to title attribute', (done) => {
    const state = dispatch({
      type: actionTypes.SET_MANAGE_RECIPE_ENTRY,
      entry: 'titleFake',
      value: 'new recipe',
    });
    expect(state.title).toEqual(initialState.title);
    done();
  });

  it('Should', (done) => {
    const state = dispatch({
      type: actionTypes.SET_MANAGE_RECIPE_ENTRIES,
      pairs: {
        title: 'another recipe',
        procedure: 'procedure for recipe',
      },
    });
    expect(state.title).toEqual('another recipe');
    expect(state.procedure).toEqual('procedure for recipe');
    done();
  });

  it('Should', (done) => {
    const state = dispatch({
      type: actionTypes.SET_MANAGE_RECIPE_ENTRIES,
      pairs: null,
    });
    expect(state).toEqual(initialState);
    done();
  });
});
