import expect from 'expect';
import moxios from 'moxios';
import factory from '../factory';
import mockStore from '../factory/mockStore';
import windowMock from '../factory/windowMock';

import {
  setDashboardLoading,
} from '../../actions/dashboardActions';

describe('Testing dashboard actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('Should dispatch SET_DASHBOARD_LOADING with loading status true', (done) => {
    const store = mockStore({});
    store.dispatch(setDashboardLoading(true));
    expect(store.getActions()[0]).toEqual({
      type: 'SET_DASHBOARD_LOADING',
      loading: true,
    });
    done();
  });
});
