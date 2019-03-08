import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import { BrowserRouter } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import toJson from 'enzyme-to-json';
import mockStore from '../factory/mockStore';
import factory from '../factory';
import Landing from '../../components/Landing';
import { wrapMount } from '../factory/utils';

// Import needed components

// Configure enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Writing test suites for landing page components
describe('Testing Landing page components', () => {
  const popular = factory.getMock('popular');
  const auth = factory.getMock('auth');
  const basicStore = {
    popular: { popular },
    auth,
  };

  it('Should have the Banner, Popular components with recipes', (done) => {
    const store = mockStore({
      ...basicStore,
      popular: {
        ...basicStore.popular,
        popularStatus: null,
      },
    });
    const landingWrapper = wrapMount(Landing, store, {});
    expect(landingWrapper.length).toEqual(1);
    expect(landingWrapper.find('Banner').length).toEqual(1);
    expect(landingWrapper.find('Popular').length).toEqual(1);
    expect(landingWrapper.find('Popular').find('Recipe').length).toEqual(4);
    done();
  });

  it('Should have popular recipes loading', (done) => {
    const store = mockStore({
      ...basicStore,
      popular: {
        ...basicStore.popular,
        popularStatus: 'loading',
      },
    });
    const landingWrapper = wrapMount(Landing, store, {});
    expect(landingWrapper.length).toEqual(1);
    expect(landingWrapper.find('h4').length).toEqual(1);
    expect(landingWrapper.find('h4').prop('children'))
      .toEqual('Loading popular recipes');
    done();
  });

  it('Should have popular recipes loading', (done) => {
    const store = mockStore({
      ...basicStore,
      popular: {
        ...basicStore.popular,
        popularStatus: 'error',
      },
    });
    const landingWrapper = wrapMount(Landing, store, {});
    expect(landingWrapper.length).toEqual(1);
    expect(landingWrapper.find('h4').length).toEqual(1);
    expect(landingWrapper.find('h4').prop('children'))
      .toEqual('Unable to load popular recipes');
    done();
  });

  it('Should have popular recipes loading', (done) => {
    const store = mockStore({
      ...basicStore,
      popular: {
        popular: [],
        popularStatus: null,
      },
    });
    const landingWrapper = wrapMount(Landing, store, {});
    expect(landingWrapper.length).toEqual(1);
    expect(landingWrapper.find('h4').length).toEqual(1);
    expect(landingWrapper.find('h4').prop('children'))
      .toEqual('There are no popular recipes at the moment');
    done();
  });
});
