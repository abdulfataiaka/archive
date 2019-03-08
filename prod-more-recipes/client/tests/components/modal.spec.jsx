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
import modalTypes from '../../components/Modal/modalTypes';

// Import needed components
import Modal from '../../components/Modal';
import ManageRecipe from '../../components/Modal/ManageRecipe';


// Configure enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

const manageRecipeState = {
  title: '',
  procedure: '',
  ingredients: [],
  recipeImageFile: null,
  manageRecipeStatus: null,
};

// Writing test suites for landing page components
describe('Testing Modal components', () => {
  const modalState = {
    open: false,
    modal: null,
    options: null,
  };
  it('Should mount an hidden modal', (done) => {
    const store = mockStore({ modal: { ...modalState } });
    const modalWrapper = wrapMount(Modal, store, {});
    expect(modalWrapper.length).toEqual(1);
    expect(modalWrapper.find('div').length).toEqual(3);
    expect(modalWrapper.find('div').at(0).prop('style'))
      .toEqual({ display: 'none' });
    done();
  });

  it('Should render the AddRecipe Modal', (done) => {
    const store = mockStore({
      manageRecipe: { ...manageRecipeState },
      modal: {
        ...modalState,
        open: true,
        modal: modalTypes.ADD_RECIPE_MODAL,
      },
    });
    const modalWrapper = wrapMount(Modal, store, {});
    expect(modalWrapper.find('AddRecipe').length).toEqual(1);
    expect(toJson(modalWrapper.find('AddRecipe'))).toMatchSnapshot();
    done();
  });

  it('Should render the EditRecipe Modal', (done) => {
    const recipe = factory.getMock('recipe');
    const options = {
      recipe,
    };
    const store = mockStore({
      manageRecipe: { ...manageRecipeState },
      modal: {
        ...modalState,
        open: true,
        modal: modalTypes.EDIT_RECIPE_MODAL,
        options,
      },
    });
    const modalWrapper = wrapMount(Modal, store, {});
    expect(modalWrapper.find('EditRecipe').length).toEqual(1);
    expect(toJson(modalWrapper.find('EditRecipe'))).toMatchSnapshot();
    modalWrapper.find('EditRecipe').find('Fields').find('input').simulate('change');
    modalWrapper.find('EditRecipe').find('Fields').find('textarea').simulate('focus');
    modalWrapper.find('EditRecipe').find('ImagePreview').find('button').simulate('click');
    modalWrapper.find('EditRecipe').find('ImagePreview').find('input').simulate('change');
    modalWrapper.find('EditRecipe').find('Ingredients').find('button').simulate('click');
    modalWrapper.find('EditRecipe').find('Ingredients').find('input').simulate('change');
    done();
  });

  it('Should render the AddRecipe Modal', (done) => {
    const store = mockStore({
      userRecipes: {
        deleteRecipeStatus: null,
      },
      modal: {
        ...modalState,
        open: true,
        modal: modalTypes.CONFIRM_RECIPE_DELETE_MODAL,
      },
    });
    const modalWrapper = wrapMount(Modal, store, {});
    expect(modalWrapper.length).toEqual(1);
    expect(modalWrapper.find('button').at(0).hasClass('confirm-check-button'))
      .toEqual(true);
    done();
  });

  it('Should render the Signin Modal', (done) => {
    const auth = factory.getMock('auth');
    const store = mockStore({
      auth,
      modal: {
        ...modalState,
        open: true,
        modal: modalTypes.SIGNIN_MODAL,
      },
    });
    const modalWrapper = wrapMount(Modal, store, {});
    expect(modalWrapper.length).toEqual(1);
    expect(toJson(modalWrapper)).toMatchSnapshot();
    expect(modalWrapper.find('form').length).toEqual(1);
    expect(modalWrapper.find('input').length).toEqual(2);
    expect(modalWrapper.find('button').length).toEqual(2);
    done();
  });

  it('Should render the Signup Modal', (done) => {
    const auth = factory.getMock('auth');
    const store = mockStore({
      auth,
      modal: {
        ...modalState,
        open: true,
        modal: modalTypes.SIGNUP_MODAL,
      },
    });
    const modalWrapper = wrapMount(Modal, store, {});
    expect(modalWrapper.length).toEqual(1);
    expect(toJson(modalWrapper)).toMatchSnapshot();
    expect(modalWrapper.find('form').length).toEqual(1);
    expect(modalWrapper.find('input').length).toEqual(4);
    expect(modalWrapper.find('button').length).toEqual(2);
    done();
  });
});
