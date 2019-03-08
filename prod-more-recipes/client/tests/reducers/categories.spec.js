import expect from 'expect';
import factory from '../factory';
import categories, { initialState } from '../../reducers/dashboard/categories';
import actionTypes from '../../actions/actionTypes';

const dispatch = action => categories(initialState, action);

describe('Testing favorites reducer', () => {
  const recipe = factory.getMock('recipe');
  it('Should', (done) => {
    const state = dispatch({
      type: actionTypes.SET_USER_CATEGORIES,
      categories: [],
    });
    expect(state.userCategoriesStatus).toEqual(null);
    expect(state.userCategories).toEqual([]);
    done();
  });

  it('Should set state back to initialState', (done) => {
    const state = dispatch({
      type: actionTypes.LOGOUT,
    });
    expect(state).toEqual(initialState);
    done();
  });

  it('Should ', (done) => {
    const state = dispatch({
      type: actionTypes.SET_USER_CATEGORIES_STATUS,
      status: 'error',
    });
    expect(state.userCategoriesStatus).toEqual('error');
    done();
  });

  it('Should ', (done) => {
    const state = dispatch({
      type: actionTypes.SET_ADD_CATEGORY_STATUS,
      status: 'error',
    });
    expect(state.userAddCategoryStatus).toEqual('error');
    done();
  });

  it('Should ', (done) => {
    const state = categories({ ...initialState, userCategories: [] }, {
      type: actionTypes.CATEGORY_ADDED,
      newCategory: { id: 4, name: 'Bully' },
    });
    expect(state.userAddCategoryStatus).toEqual(null);
    expect(state.userCategories).toEqual([{ id: 4, name: 'Bully' }]);
    done();
  });

  it('Should ', (done) => {
    const state = categories({
      ...initialState,
      userCategories: [
        { id: 4, name: 'Bully' },
      ],
    }, {
      type: actionTypes.USER_CATEGORY_DELETED,
      categoryId: 4,
    });
    expect(state.userDeleteCategoriesStatus).toEqual(null);
    expect(state.userCategories).toEqual([]);
    done();
  });

  it('Should ', (done) => {
    const state = dispatch({
      type: actionTypes.SET_CATEGORY_DELETE_STATUS,
      status: 'error',
    });
    expect(state.userDeleteCategoriesStatus).toEqual('error');
    done();
  });
});
