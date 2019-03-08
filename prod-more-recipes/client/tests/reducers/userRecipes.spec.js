import expect from 'expect';
import factory from '../factory';
import userRecipes, { initialState } from '../../reducers/dashboard/userRecipes';
import actionTypes from '../../actions/actionTypes';

const recipe = factory.getMock('recipe');
const dispatch = action => userRecipes(
  { ...initialState, recipes: [{ ...recipe }] },
  action,
);
describe('Testing userRecipes reducer', () => {
  it('Should', (done) => {
    const state = dispatch({
      type: actionTypes.RECIPE_UPDATED,
      recipe: { ...recipe, title: 'edited recipe' },
    });
    expect(state.recipes[0].title).toEqual('edited recipe');
    done();
  });

  it('Should', (done) => {
    const state = dispatch({
      type: actionTypes.RECIPE_UPDATED,
      recipe: { ...recipe, id: 9444, title: 'edited recipe' },
    });
    expect(state.recipes[0].title).toEqual(recipe.title);
    done();
  });

  it('Should', (done) => {
    const state = dispatch({
      type: actionTypes.SET_USER_RECIPES_STATUS,
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

  it('Should set state back to initialState', (done) => {
    const pagination = { page: 1, totalCount: 0, pageCount: 1 };
    const state = dispatch({
      type: actionTypes.SET_USER_RECIPES,
      payload: {
        recipes: [],
        pagination,
      },
    });
    expect(state.recipes).toEqual([]);
    expect(state.recipesPagination).toEqual(pagination);
    done();
  });

  it('Should set state back to initialState', (done) => {
    const pagination = { page: 1, totalCount: 0, pageCount: 1 };
    const state = dispatch({
      type: actionTypes.USER_RECIPE_DELETED,
      recipeId: recipe.id,
    });
    expect(state.recipes).toEqual([]);
    expect(state.deleteRecipeStatus).toEqual('deleted');
    done();
  });

  it('Should set state back to initialState', (done) => {
    const state = dispatch({
      type: actionTypes.SET_DELETE_USER_RECIPE_STATUS,
      status: 'new status',
    });
    expect(state.deleteRecipeStatus).toEqual('new status');
    done();
  });
});
