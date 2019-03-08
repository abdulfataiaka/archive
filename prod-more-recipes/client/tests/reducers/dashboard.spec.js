import expect from 'expect';
import factory from '../factory';
import dashboard, { initialState } from '../../reducers/dashboard';
import actionTypes from '../../actions/actionTypes';

const dispatch = action => dashboard(initialState, action);

describe('Testing catalog reducer', () => {
  it('Should set userReady to true', (done) => {
    const state = dispatch({
      type: actionTypes.AUTH_FAILED,
    });
    expect(state.userReady).toEqual(true);
    done();
  });

  it('Should set userReady to true', (done) => {
    const state = dispatch({
      type: actionTypes.AUTH_SUCCESSFUL,
    });
    expect(state.userReady).toEqual(true);
    done();
  });

  it('Should set state back to initialState', (done) => {
    const state = dispatch({
      type: actionTypes.LOGOUT,
    });
    expect(state).toEqual(initialState);
    done();
  });

  it('Should set dashboardLoading to true', (done) => {
    const state = dispatch({
      type: actionTypes.SET_DASHBOARD_LOADING,
      loading: true,
    });
    expect(state.dashboardLoading).toEqual(true);
    done();
  });
});
