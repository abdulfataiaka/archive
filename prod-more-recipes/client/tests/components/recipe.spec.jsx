import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import { Route, Redirect } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import factory from '../factory';
import mockStore from '../factory/mockStore';

// Import needed components
import ConnectRecipe, { Recipe } from '../../components/partials/Recipe';
import ConnectMyRecipeCtrl, { MyRecipeCtrl } from '../../components/partials/Recipe/MyRecipeCtrl';
import ConnectGeneralCtrl, { GeneralCtrl } from '../../components/partials/Recipe/GeneralCtrl';
import ConnectFavoritesCtrl, { FavoritesCtrl } from '../../components/partials/Recipe/FavoritesCtrl';

// Configure enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Writing test suites
describe('Testing Recipe component', () => {
  it('Should render without error with classSet 1', (done) => {
    const recipe = factory.getMock('recipe');
    const auth = factory.getMock('auth');
    const store = mockStore({
      auth,
    });
    const recipeWrapper = mount(<Recipe recipe={recipe} classSet={1} />);
    const connectRecipeWrapper = mount(<ConnectRecipe store={store} recipe={recipe} />);
    expect(toJson(recipeWrapper)).toMatchSnapshot();
    done();
  });

  it('Should render without error with classSet 2', (done) => {
    const recipe = factory.getMock('recipe');
    const recipeWrapper = mount(<Recipe recipe={recipe} classSet={2} />);
    expect(toJson(recipeWrapper)).toMatchSnapshot();
    done();
  });

  it('Should render without error with classSet 3', (done) => {
    const recipe = factory.getMock('recipe');
    const recipeWrapper = mount(<Recipe recipe={recipe} classSet={3} />);
    expect(toJson(recipeWrapper)).toMatchSnapshot();
    done();
  });

  it('Should render without error with default classSet', (done) => {
    const recipe = factory.getMock('recipe');
    const recipeWrapper = mount(<Recipe recipe={recipe} classSet={7} />);
    expect(toJson(recipeWrapper)).toMatchSnapshot();
    done();
  });

  it('Should trigger mouseEnter and mouseLeave events', (done) => {
    const recipe = factory.getMock('recipe');
    const recipeWrapper = mount(<Recipe recipe={recipe} />);
    recipeWrapper.find('div').at(2).simulate('mouseEnter');
    expect(recipeWrapper.state().showOver).toEqual(true);
    recipeWrapper.find('div').at(2).simulate('mouseLeave');
    expect(recipeWrapper.state().showOver).toEqual(false);
    done();
  });

  it('Should render in general control mode', (done) => {
    const store = mockStore({});
    const recipe = factory.getMock('recipe');
    const recipeWrapper = shallow(<Recipe controlSet={1} recipe={recipe} store={store} />);
    expect(recipeWrapper.length).toEqual(1);
    done();
  });

  it('Should render in myRecipes control mode', (done) => {
    const store = mockStore({});
    const recipe = factory.getMock('recipe');
    const recipeWrapper = shallow(<Recipe controlSet={2} recipe={recipe} store={store} />);
    expect(recipeWrapper.length).toEqual(1);
    done();
  });

  it('Should render in favorite control mode', (done) => {
    const store = mockStore({});
    const recipe = factory.getMock('recipe');
    const recipeWrapper = shallow(<Recipe controlSet={3} recipe={recipe} store={store} />);
    expect(recipeWrapper.length).toEqual(1);
    done();
  });
});

describe('Testing MyRecipeCtrl component', () => {
  it('Should render without error with classSet 1', (done) => {
    const recipe = factory.getMock('recipe');
    const auth = factory.getMock('auth');
    const store = mockStore({
      auth,
    });
    const myRecipeWrapper = shallow(<MyRecipeCtrl recipe={recipe} />);
    const connectMyRecipeWrapper = shallow(<ConnectMyRecipeCtrl store={store} />);
    expect(myRecipeWrapper.length).toEqual(1);
    expect(connectMyRecipeWrapper.length).toEqual(1);
    done();
  });

  it('Should simulate buttons', (done) => {
    const recipe = factory.getMock('recipe');
    const props = {
      recipe,
      openModal: () => {},
    };
    const openModalSpy = sinon.spy(props, 'openModal');
    const myRecipeWrapper = shallow(<MyRecipeCtrl {...props} />);
    myRecipeWrapper.find('button').at(2).simulate('click');
    expect(openModalSpy.called).toEqual(true);
    myRecipeWrapper.find('button').at(0).simulate('click');
    expect(openModalSpy.called).toEqual(true);
    done();
  });
});

describe('Testing GeneralCtrl component', () => {
  it('Should render without error', (done) => {
    const auth = factory.getMock('auth');
    const store = mockStore({
      auth,
    });
    const recipe = factory.getMock('recipe');
    const generalWrapper = shallow(<GeneralCtrl recipe={recipe} />);
    const connectGeneralWrapper = shallow(<ConnectGeneralCtrl store={store} />);
    expect(generalWrapper.length).toEqual(1);
    expect(connectGeneralWrapper.length).toEqual(1);
    done();
  });
});

describe('Testing FavoritesCtrl component', () => {
  const auth = factory.getMock('auth');
  const store = mockStore({
    auth,
  });
  it('Should render without error', (done) => {
    const recipe = factory.getMock('recipe');
    const favoritesWrapper = shallow(<FavoritesCtrl recipe={recipe} />);
    const connectFavoritesWrapper = shallow(<ConnectFavoritesCtrl store={store} />);
    expect(favoritesWrapper.length).toEqual(1);
    expect(connectFavoritesWrapper.length).toEqual(1);
    done();
  });
});
