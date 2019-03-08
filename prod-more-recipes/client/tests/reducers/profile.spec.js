import expect from 'expect';
import factory from '../factory';
import profile, { initialState } from '../../reducers/dashboard/profile';
import actionTypes from '../../actions/actionTypes';

const dispatch = action => profile(initialState, action);
const userDetails = {
  name: 'Abdulfatai',
  email: null,
  gender: 'male',
};
describe('Testing profile reducer', () => {
  it('Should', (done) => {
    const state = dispatch({
      type: actionTypes.SET_USER_PASSWORD_STATUS,
      status: 'loading',
    });
    expect(state.userPasswordUpdateStatus).toEqual('loading');
    done();
  });

  it('Should', (done) => {
    const state = dispatch({
      type: actionTypes.SET_USER_DETAILS,
      userDetails: { ...userDetails },
    });
    expect(state.userDetailsStatus).toEqual(null);
    expect(state.userDetails).toEqual({ ...userDetails });
    done();
  });

  it('Should', (done) => {
    const state = dispatch({
      type: actionTypes.SET_USER_DETAILS_STATUS,
      status: 'loading',
    });
    expect(state.userDetailsStatus).toEqual('loading');
    done();
  });

  it('Should', (done) => {
    const state = dispatch({
      type: actionTypes.SET_PERSONAL_DETAILS_UPDATE_STATUS,
      status: 'loading',
    });
    expect(state.userDetailsUpdateStatus).toEqual('loading');
    done();
  });

  it('Should', (done) => {
    const state = dispatch({
      type: actionTypes.SET_PERSONAL_DETAILS_UPDATE_STATUS,
      status: 'loading',
    });
    expect(state.userDetailsUpdateStatus).toEqual('loading');
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
      type: actionTypes.PERSONAL_DETAILS_UPDATED,
      userDetails: { ...userDetails, name: 'Adenle' },
    });
    expect(state.userDetailsStatus).toEqual(null);
    expect(state.userDetailsUpdateStatus).toEqual(true);
    expect(state.userDetails).toEqual({ ...userDetails, name: 'Adenle' });
    done();
  });
});
