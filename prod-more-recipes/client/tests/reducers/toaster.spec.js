import expect from 'expect';
import factory from '../factory';
import toaster, { initialState } from '../../reducers/toaster';
import actionTypes from '../../actions/actionTypes';

const dispatch = action => toaster({ ...initialState, timer: 23 }, action);

describe('Testing toaster reducer', () => {
  it('Should', (done) => {
    const state = dispatch({
      type: actionTypes.SHOW_TOASTER,
      payload: {
        message: 'hello there',
        timer: 345,
      },
    });
    expect(state.message).toEqual('hello there');
    expect(state.timer).toEqual(345);
    done();
  });

  it('Should', (done) => {
    const state = dispatch({
      type: actionTypes.SHOW_LOADER,
    });
    expect(state.message).toEqual(null);
    expect(state.timer).toEqual(null);
    done();
  });

  it('Should', (done) => {
    const state = dispatch({
      type: actionTypes.HIDE_TOASTER,
    });
    expect(state).toEqual(initialState);
    done();
  });
});
