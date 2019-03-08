import expect from 'expect';
import moxios from 'moxios';
import factory from '../factory';
import mockStore from '../factory/mockStore';
import windowMock from '../factory/windowMock';

import {
  showToastMocker,
  modalMocker,
  authMocker,
  favMocker,
  authFailedMock,
  setUpdatePwdStatusMock,
  logoutMock,
  setPersonalStatusMock,
  personalUpdatedMock,
} from '../factory/actionMocks';

import {
  logout,
  setAuthError,
  registerUser,
  loginUser,
  authInitOnLoad,
  setUpdateUserPasswordStatus,
  updateUserPassword,
  setUpdatePersonalDetailsStatus,
  updateUserPersonalDetails,
} from '../../actions/userActions';

window.sessionStorage = windowMock.sessionStorage;

describe('Testing user actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('Should dispatch SHOW_TOASTER and LOGOUT actions', (done) => {
    const store = mockStore({});
    store.dispatch(logout());
    expect(store.getActions()[1])
      .toEqual(logoutMock);
    done();
  });

  it('Should dispatch SET_AUTH_ERROR with error message', (done) => {
    const store = mockStore({});
    store.dispatch(setAuthError('error occured during the process'));
    expect(store.getActions()).toEqual([
      authMocker('error', { error: 'error occured during the process' }),
    ]);
    done();
  });

  it('Should dispatch SET_AUTH_ERROR with error: error', (done) => {
    moxios.stubRequest('/api/v1/users/signup', {
      status: 400,
      response: { error: 'error occured during the process' },
    });
    const store = mockStore({});
    store.dispatch(registerUser({ id: 44 })).then(() => {
      expect(store.getActions()).toEqual([
        authMocker('error', { error: 'error occured during the process' }),
      ]);
    });
    done();
  });

  it('Should dispatch SET_AUTH_ERROR', (done) => {
    moxios.stubRequest('/api/v1/users/signin', {
      status: 400,
      response: { error: 'error occured during the process' },
    });
    const store = mockStore({});
    store.dispatch(loginUser()).then(() => {
      expect(store.getActions()).toEqual([
        authMocker('error', { error: 'error occured during the process' }),
      ]);
    });
    done();
  });

  it('Should dispatch SET_AUTH_ERROR', (done) => {
    moxios.stubRequest('/api/v1/users/signin', {
      status: 400,
      response: { error: 'Provide valid username' },
    });
    const store = mockStore({});
    store.dispatch(loginUser({
      username: '',
      password: 'password',
    })).then(() => {
      expect(store.getActions()).toEqual([
        authMocker('error', { error: 'Provide valid username' }),
      ]);
    });
    done();
  });

  it('Should dispatch action with action type AUTH_SUCCESSFUL', (done) => {
    const userDetails = factory.getMock('newuser');
    const authUserA = factory.getMock('authUserA');
    moxios.stubRequest('/api/v1/users/signup', {
      status: 201,
      response: { ...authUserA.signupRes },
    });

    const store = mockStore({});
    store.dispatch(registerUser(userDetails)).then(() => {
      expect(store.getActions()[0])
        .toEqual(authMocker('authSuccess', { user: 'A' }));
      expect(store.getActions()[2]).toEqual(modalMocker('hide'));
      expect(store.getActions()[3]).toEqual(favMocker('freshSet'));
    });
    done();
  });

  it('Should dispatch action with action type AUTH_SUCCESSFUL', (done) => {
    const authUserA = factory.getMock('authUserA');
    moxios.stubRequest('/api/v1/users/signin', {
      status: 200,
      response: { ...authUserA.signinRes },
    });
    const store = mockStore({});
    store.dispatch(loginUser({
      username: 'abdulfatai',
      password: 'password',
    })).then(() => {
      expect(store.getActions()[0])
        .toEqual(authMocker('authSuccess', { user: 'A' }));
      expect(store.getActions()[2]).toEqual(modalMocker('hide'));
    });
    done();
  });

  it('Should', (done) => {
    moxios.stubRequest('/api/v1/users/client/verify', {
      status: 200,
      response: { verificationStatus: true },
    });
    const store = mockStore({});
    store.dispatch(authInitOnLoad()).then(() => {
      expect(store.getActions()[0])
        .toEqual(authMocker('authSuccess', { user: 'A' }));
    });
    done();
  });

  it('Should', (done) => {
    moxios.stubRequest('/api/v1/users/client/verify', {
      status: 200,
      response: { verificationStatus: false },
    });
    const store = mockStore({});
    store.dispatch(authInitOnLoad()).then(() => {
      expect(store.getActions()[1]).toEqual(logoutMock);
    });
    done();
  });

  it('Should', (done) => {
    moxios.stubRequest('/api/v1/users/client/verify', {
      status: 200,
      response: { verificationStatus: false },
    });
    const store = mockStore({});
    window.sessionStorage.setItem('user', null);
    store.dispatch(authInitOnLoad());
    expect(store.getActions()[0]).toEqual(authFailedMock);
    done();
  });

  it('Should dispatch action SET_USER_PASSWORD_STATUS with specified status', (done) => {
    const store = mockStore({});
    store.dispatch(setUpdateUserPasswordStatus('sent status'));
    expect(store.getActions()[0]).toEqual(setUpdatePwdStatusMock('sent status'));
    done();
  });

  it('Should set error to true by dispatching action SET_USER_PASSWORD_STATUS', (done) => {
    moxios.stubRequest('/api/v1/users/password', {
      status: 200,
      response: {
        message: 'Password changed successfully',
      },
    });
    const store = mockStore({});
    store.dispatch(updateUserPassword(
      'token',
      'current',
      'new',
    )).then(() => {
      expect(store.getActions()[0]).toEqual(setUpdatePwdStatusMock(true));
    });
    done();
  });

  it('Should set error status by dispatching action SET_USER_PASSWORD_STATUS', (done) => {
    moxios.stubRequest('/api/v1/users/password', {
      status: 400,
      response: {
        error: 'Provide your current password',
      },
    });
    const store = mockStore({});
    store.dispatch(updateUserPassword(
      'user token',
      '',
      'new password',
    )).then(() => {
      expect(store.getActions()[0])
        .toEqual(setUpdatePwdStatusMock('Provide your current password'));
    });
    done();
  });

  it('Should dispatch action SET_USER_PASSWORD_STATUS with specified status', (done) => {
    const store = mockStore({});
    store.dispatch(setUpdatePersonalDetailsStatus('sent status'));
    expect(store.getActions()[0]).toEqual(setPersonalStatusMock('sent status'));
    done();
  });

  it('Should', (done) => {
    const user = {
      id: 1,
      name: 'Abdulfatai',
      email: null,
      gender: 'male',
    };
    const {
      id,
      name,
      email,
      gender,
    } = user;
    moxios.stubRequest('/api/v1/users/personal', {
      status: 200,
      response: { ...factory.updatePersonalResMock(id, name, email, gender) },
    });
    const store = mockStore({});
    store.dispatch(updateUserPersonalDetails(
      'token',
      { name, email, gender },
    )).then(() => {
      expect(store.getActions()[0]).toEqual(personalUpdatedMock({ ...user }));
    });
    done();
  });

  it('Should', (done) => {
    moxios.stubRequest('/api/v1/users/personal', {
      status: 400,
      response: {
        error: 'Provide your name',
      },
    });
    const store = mockStore({});
    store.dispatch(updateUserPersonalDetails(
      'user token',
      { name: '', email: null, gender: null },
    )).then(() => {
      expect(store.getActions()[0])
        .toEqual(setPersonalStatusMock('Provide your name'));
    });
    done();
  });
});
