import expect from 'expect';
import moxios from 'moxios';
import factory from '../factory';
import mockStore from '../factory/mockStore';
import windowMock from '../factory/windowMock';

import {
  toastMessage,
  hideToaster,
} from '../../actions/toasterActions';

window.sessionStorage = windowMock.sessionStorage;

describe('Testing toast actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('Should', (done) => {
    const store = mockStore({});
    store.dispatch(hideToaster());
    expect(store.getActions()[0]).toEqual({ type: 'HIDE_TOASTER' });
    done();
  });

  it('Should', (done) => {
    const store = mockStore({});
    store.dispatch(toastMessage('hello there', 3));
    expect(store.getActions()[0]).toEqual({
      type: 'SHOW_TOASTER',
      payload: {
        message: 'hello there',
        timer: 7,
      },
    });
    done();
  });

  it('Should', (done) => {
    const store = mockStore({});
    store.dispatch(toastMessage('hello there', null));
    expect(store.getActions().length).toEqual(0);
    done();
  });
});
