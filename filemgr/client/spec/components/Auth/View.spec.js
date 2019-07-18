import React from 'react';
import { shallow } from 'enzyme';
import View from '../../../components/Auth/View';
import { AuthPropMock } from '../../mocks/components/Auth';

describe('Auth View Component', () => {
  const props = AuthPropMock.view();
  const wrapper = shallow(<View { ...props } />);

  it('renders the Auth view component', () => {
    expect(wrapper.length).toBe(1);
  });

  it('renders the auth element', () => {
    expect(wrapper.find('#auth').length).toBe(1);
  });

  it('renders loading icon', () => {
    expect(wrapper.find('img').length).toBe(0);
    wrapper.setProps({ loading: true });
    expect(wrapper.find('img').length).toBe(1);
  });

  it('renders error', () => {
    wrapper.setProps({ error: 'error-text' });
    expect(wrapper.contains('error-text')).toBe(true);
  });
});
