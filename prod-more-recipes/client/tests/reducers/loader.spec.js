import expect from 'expect';
import loader from '../../reducers/loader';
import actionTypes from '../../actions/actionTypes';

import {
} from '../../actions/dashboardActions';

const initialState = { visible: false };
const dispatch = action => loader(initialState, action);

describe('Testing loader reducer', () => {
  it('Should set attribute visible to true', (done) => {
    const state = dispatch({
      type: actionTypes.SHOW_LOADER,
    });
    expect(state.visible).toBe(true);
    done();
  });

  it('Should set attribute visible to false', (done) => {
    const state = dispatch({
      type: actionTypes.SHOW_TOASTER,
    });
    expect(state.visible).toBe(false);
    done();
  });
});
