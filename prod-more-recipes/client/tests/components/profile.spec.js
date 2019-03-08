import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { wrapMount } from '../factory/utils';
import factory from '../factory';
import mockStore from '../factory/mockStore';
import store from '../../store';
import actionTypes from '../../actions/actionTypes';
import modalTypes from '../../components/Modal/modalTypes';

// Import needed components
import Profile from '../../components/Dashboard/Profile';

// Configure enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

const token = '';
const user = {
  id: 1,
  username: 'abdulfatai',
  name: 'Abdulfatai',
  email: null,
  gender: 'male',
  avatar: null,
  createdAt: '2018-01-28T09:56:42.913Z',
  updatedAt: '2018-02-10T10:47:14.069Z',
};
const recipe = factory.getMock('recipe');
const state = {
  ...store.getState(),
  auth: {
    user: { userId: 1, username: 'olaide', token: '' },
    loggedIn: true,
    authError: null,
  },
  profile: {
    userDetails: {
      ...user,
    },
  },
};
const mockstore = mockStore(state);
const props = {};
const ConnectedProfile = wrapMount(Profile, mockstore, props);

// Writing test suites
describe('Testing Profile components', () => {
  it('Should enter and leave edit mode by simulating clicks', (done) => {
    expect(ConnectedProfile.length).toEqual(1);
    ConnectedProfile.find('button').at(0).simulate('click');
    expect(ConnectedProfile.find('Profile').instance().state.edit).toEqual(true);
    ConnectedProfile.find('button').at(0).simulate('click');
    expect(ConnectedProfile.find('Profile').instance().state.edit).toEqual(false);
    done();
  });

  it('Should', (done) => {
    ConnectedProfile.find('button').at(0).simulate('click');

    const ChangePassword = ConnectedProfile.find('ChangePassword');
    expect(ChangePassword.length).toEqual(1);
    ChangePassword.find('input').at(0).simulate('change');
    ChangePassword.find('input').at(0).simulate('focus');
    ChangePassword.find('form').simulate('submit', {
      preventDefault: () => {},
    });
    ChangePassword.instance().setState({ error: false });
    ChangePassword.instance().setState({ error: true });
    done();
  });
});
