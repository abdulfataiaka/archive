import expect from 'expect';
import auth, { initialState } from '../../reducers/auth';
import actionTypes from '../../actions/actionTypes';

import {
} from '../../actions/dashboardActions';

const dispatch = action => auth(initialState, action);

describe('Testing loader reducer', () => {
  it('Should set error in authError attribute', (done) => {
    const state = dispatch({
      type: actionTypes.SET_AUTH_ERROR,
      error: 'error gotten',
    });
    expect(state.authError).toBe('error gotten');
    done();
  });

  it('Should set user object and loggedIn to true', (done) => {
    const state = dispatch({
      type: actionTypes.AUTH_SUCCESSFUL,
      user: {},
    });
    expect(state.authError).toBe(null);
    expect(state.user).toEqual({});
    expect(state.loggedIn).toBe(true);
    done();
  });

  it('Should set state back to initialState', (done) => {
    const state = dispatch({
      type: actionTypes.LOGOUT,
    });
    expect(state).toEqual(initialState);
    done();
  });
});
