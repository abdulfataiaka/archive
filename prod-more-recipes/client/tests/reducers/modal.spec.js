import expect from 'expect';
import factory from '../factory';
import modal, { initialState } from '../../reducers/modal';
import actionTypes from '../../actions/actionTypes';

const dispatch = action => modal(initialState, action);

describe('Testing modal reducer', () => {
  it('Should set open attribute to true and modal to AddRecipeModal', (done) => {
    const state = dispatch({
      type: actionTypes.OPEN_MODAL,
      modal: 'AddRecipeModal',
      options: { recipeId: 34 },
    });
    expect(state.open).toEqual(true);
    expect(state.modal).toEqual('AddRecipeModal');
    expect(state.options).toEqual({ recipeId: 34 });
    done();
  });

  it('Should', (done) => {
    const state = dispatch({
      type: actionTypes.HIDE_MODAL,
    });
    expect(state).toEqual(initialState);
    done();
  });
});
