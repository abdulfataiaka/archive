import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import expect from 'expect';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { wrapMount } from '../factory/utils';
import factory from '../factory';
import mockStore from '../factory/mockStore';
import store from '../../store';
import actionTypes from '../../actions/actionTypes';
import modalTypes from '../../components/Modal/modalTypes';

// Import needed components
import Dashboard from '../../components/Dashboard';
import { initialState as dashboardInit } from '../../reducers/dashboard';
import { initialState as authInit } from '../../reducers/auth';
import { initialState as profileInit } from '../../reducers/dashboard/profile';

// Configure enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

const token = '';
const recipe = factory.getMock('recipe');
const state = {
  ...store.getState(),
  auth: {
    user: { userId: 1, username: 'olaide', token: '' },
    loggedIn: true,
    authError: null,
  },
};

// Writing test suites
describe('Testing Dashboard components', () => {
  it('Should render with error loading your recipes', (done) => {
    const useState = {
      ...state,
      userRecipes: {
        ...state.userRecipes,
        recipes: null,
      },
    };
    const mockstore = mockStore(useState);
    const props = {};
    const ConnectedDashboard = wrapMount(Dashboard, mockstore, props);
    const Recipes = ConnectedDashboard.find('Dashboard').find('Content').find('Recipes');

    expect(Recipes.length).toEqual(1);
    expect(Recipes.find('h4').prop('children')).toEqual('Unable to load your recipes');
    done();
  });

  it("Should render with You haven't added any recipe yet", (done) => {
    const useState = {
      ...state,
      userRecipes: {
        ...state.userRecipes,
        recipes: [],
      },
    };
    const mockstore = mockStore(useState);
    const props = {};
    const ConnectedDashboard = wrapMount(Dashboard, mockstore, props);
    const Recipes = ConnectedDashboard.find('Dashboard').find('Content').find('Recipes');

    expect(Recipes.length).toEqual(1);
    expect(Recipes.find('h4').prop('children')).toEqual("You haven't added any recipe yet");
    done();
  });

  it("Should render with You haven't added any recipe yet", (done) => {
    const useState = {
      ...state,
      userRecipes: {
        ...state.userRecipes,
        recipesStatus: 'loading',
      },
    };
    const mockstore = mockStore(useState);
    const props = {};
    const ConnectedDashboard = wrapMount(Dashboard, mockstore, props);
    const Recipes = ConnectedDashboard.find('Dashboard').find('Content').find('Recipes');

    expect(Recipes.find('h4').prop('children')).toEqual('Loading your recipes');
    done();
  });

  it('Should dispatch OPEN_MODAL action with ADD_RECIPE_MODAL modalType', (done) => {
    const useState = {
      ...state,
      userRecipes: {
        ...state.userRecipes,
        recipes: [],
      },
    };
    const mockstore = mockStore(useState);
    const props = {};
    const ConnectedDashboard = wrapMount(Dashboard, mockstore, props);
    const Recipes = ConnectedDashboard.find('Dashboard').find('Content').find('Recipes');

    expect(Recipes.length).toEqual(1);
    Recipes.find('button').at(0).simulate('click');
    const actions = mockstore.getActions();
    expect(actions[actions.length - 1].type).toEqual('OPEN_MODAL');
    expect(actions[actions.length - 1].modal).toEqual('ADD_RECIPE_MODAL');
    done();
  });

  it('Should dispatch OPEN_MODAL action with ADD_RECIPE_MODAL modalType', (done) => {
    const useState = {
      ...state,
      userRecipes: {
        ...state.userRecipes,
        recipes: [{ ...recipe }],
        recipesPagination: { totalCount: 1, pageCount: 1, page: 1 },
      },
    };
    const mockstore = mockStore(useState);
    const props = {};
    const ConnectedDashboard = wrapMount(Dashboard, mockstore, props);
    const Recipes = ConnectedDashboard.find('Dashboard').find('Content').find('Recipes');
    const deleteButton = Recipes.find('Recipe').find('button').at(2);
    deleteButton.simulate('click');
    const actions = mockstore.getActions();
    const deleteAction = actions[actions.length - 1];
    expect(deleteAction.type).toEqual('OPEN_MODAL');
    expect(deleteAction.modal).toEqual('CONFIRM_RECIPE_DELETE_MODAL');
    done();
  });
});
