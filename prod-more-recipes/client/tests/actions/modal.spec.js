import expect from 'expect';
import moxios from 'moxios';
import factory from '../factory';
import mockStore from '../factory/mockStore';
import windowMock from '../factory/windowMock';

import {
  hideModal,
  openModal,
} from '../../actions/modalActions';

describe('Testing modal actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('Should', (done) => {
    const store = mockStore({});
    store.dispatch(hideModal());
    expect(store.getActions()[0]).toEqual({
      type: 'HIDE_MODAL',
    });
    done();
  });

  it('Should', (done) => {
    const store = mockStore({});
    store.dispatch(openModal({
      modal: null,
      options: null,
    }));
    expect(store.getActions().length).toEqual(0);
    done();
  });

  it('Should', (done) => {
    const modalSetup = {
      modal: 'EDIT_RECIPE_MODAL',
      options: null,
    };
    const store = mockStore({});
    store.dispatch(openModal(
      modalSetup.modal,
      modalSetup.options,
    ));
    expect(store.getActions()[0]).toEqual({
      type: 'OPEN_MODAL',
      ...modalSetup,
    });
    done();
  });
});
