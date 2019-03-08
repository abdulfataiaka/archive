import expect from 'expect';
import moxios from 'moxios';
import factory from '../factory';
import mockStore from '../factory/mockStore';
import windowMock from '../factory/windowMock';

import {
  setGetUserDetailsStatus,
  getUserDetails,
} from '../../actions/profileActions';

window.sessionStorage = windowMock.sessionStorage;

describe('Testing profile actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('Should', (done) => {
    const store = mockStore({});
    store.dispatch(setGetUserDetailsStatus('loading'));
    expect(store.getActions()[0]).toEqual({
      type: 'SET_USER_DETAILS_STATUS',
      status: 'loading',
    });
    done();
  });

  it('Should', (done) => {
    const store = mockStore({});
    store.dispatch(setGetUserDetailsStatus('error'));
    expect(store.getActions()[0]).toEqual({
      type: 'SET_USER_DETAILS_STATUS',
      status: 'error',
    });
    done();
  });

  it('Should', (done) => {
    const userId = 1;
    const userDetails = factory.getUserResMock(userId);
    moxios.stubRequest(`/api/v1/users/${userId}`, {
      status: 200,
      response: { ...userDetails },
    });
    const store = mockStore({});
    store.dispatch(getUserDetails(userId)).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: 'SET_USER_DETAILS',
        userDetails: {
          ...userDetails.user,
        },
      });
    });
    done();
  });

  it('Should', (done) => {
    const userId = 1;
    moxios.stubRequest(`/api/v1/users/${userId}`, {
      status: 400,
      response: { error: '' },
    });
    const store = mockStore({});
    store.dispatch(getUserDetails(userId)).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: 'SET_USER_DETAILS_STATUS',
        status: 'error',
      });
    });
    done();
  });
});
