import expect from 'expect';
import factory from '../factory';
import catalog, { initialState } from '../../reducers/catalog';
import actionTypes from '../../actions/actionTypes';

const dispatch = action => catalog(initialState, action);

describe('Testing catalog reducer', () => {
  it('Should set recipesStatus to loading', (done) => {
    const state = dispatch({
      type: actionTypes.SET_CATALOG_RECIPES_STATUS,
      status: 'loading',
    });
    expect(state.recipesStatus).toEqual('loading');
    done();
  });

  it('Should set recipes, pagination and isSearch attributes', (done) => {
    const pagination = { page: 1, totalCount: 5, pageCount: 2 };
    const state = dispatch({
      type: actionTypes.SET_CATALOG_RECIPES,
      recipes: [],
      pagination,
      isSearch: false,
    });
    expect(state.recipes).toEqual([]);
    expect(state.pagination).toEqual(pagination);
    expect(state.isSearch).toEqual(false);
    expect(state.recipesStatus).toEqual(null);
    done();
  });
});
