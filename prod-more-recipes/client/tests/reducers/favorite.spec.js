import expect from 'expect';
import factory from '../factory';
import favorites, { initialState } from '../../reducers/favorites';
import actionTypes from '../../actions/actionTypes';

const dispatch = action => favorites(initialState, action);

describe('Testing favorites reducer', () => {
  const recipe = factory.getMock('recipe');
  it('Should', (done) => {
    const state = dispatch({
      type: actionTypes.SET_FAVORITES,
      payload: [{ ...recipe }],
    });
    expect(state).toEqual([{ ...recipe }]);
    done();
  });

  it('Should set state back to initialState', (done) => {
    const state = dispatch({
      type: actionTypes.LOGOUT,
    });
    expect(state).toEqual(initialState);
    done();
  });

  it('Should add recipeId to favorites array', (done) => {
    const state = dispatch({
      type: actionTypes.ADD_FAVORITE,
      payload: 341,
    });
    expect(state[0]).toEqual(341);
    done();
  });

  it('Should remove recieId if exists', (done) => {
    const state = favorites([341], {
      type: actionTypes.USER_RECIPE_DELETED,
      recipeId: 341,
    });
    expect(state.length).toEqual(0);
    done();
  });

  it('Should remove recieId if exists', (done) => {
    const state = favorites([341], {
      type: actionTypes.DELETE_FAVORITE,
      recipeId: 341,
    });
    expect(state.length).toEqual(0);
    done();
  });
});
