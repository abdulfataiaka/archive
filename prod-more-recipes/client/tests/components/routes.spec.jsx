import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import expect from 'expect';
import moxios from 'moxios';
import Adapter from 'enzyme-adapter-react-16';
import { Route, Redirect } from 'react-router-dom';
import toJson from 'enzyme-to-json';

import store from '../../store';

// Import needed components
import Routes from '../../components/Routes';

// Configure enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Writing test suites
describe('Testing Routes component', () => {
  const routesWrapper = shallow((
    <Routes />
  ));

  it('Should render all seven routes', (done) => {
    expect(routesWrapper.find(Route).length).toEqual(7);
    done();
  });

  it('Should have first route with prop path to equal /', (done) => {
    expect(routesWrapper.find(Route).at(0).prop('path')).toEqual('/');
    done();
  });

  it('Should have second route with prop path to be /recipe/:recipeId', (done) => {
    expect(routesWrapper.find(Route).at(1)
      .prop('path'))
      .toEqual('/recipe/:recipeId');
    done();
  });

  it('Should have third route with prop path to be /catalog/page/:pageNo', (done) => {
    expect(routesWrapper.find(Route).at(2)
      .prop('path'))
      .toEqual('/catalog/page/:pageNo');
    done();
  });

  it('Should have forth route with prop path to be /dashboard', (done) => {
    expect(routesWrapper.find(Route).at(3)
      .prop('path'))
      .toEqual('/dashboard');
    done();
  });

  it('Should have fifth route with prop path to be /dashboard/favorites', (done) => {
    expect(routesWrapper.find(Route).at(4)
      .prop('path'))
      .toEqual('/dashboard/favorites');
    done();
  });

  it('Should have sixth route with prop path to be /catalog', (done) => {
    expect(routesWrapper.find(Route).at(5)
      .prop('path'))
      .toEqual('/catalog');
    done();
  });

  it('Should have sevent route with to be a redirect', (done) => {
    expect(typeof (routesWrapper.find(Route).at(6)
      .prop('component')))
      .toEqual('function');
    expect(routesWrapper.find(Route).at(6)
      .prop('component')())
      .toEqual(<Redirect to="/" />);
    done();
  });
});
