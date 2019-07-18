import React from 'react';
import { shallow } from 'enzyme';
import AuthLinkView from '../../../../components/common/Header/AuthLinkView'; 
import { HeaderPropMock } from '../../../mocks/components/Header';

describe('AuthLinkView Component', () => {
  const props = HeaderPropMock.authLinkView(jest.fn);
  const wrapper = shallow(<AuthLinkView { ...props } />);

  it('renders the auth-link element', () => {
    expect(wrapper.find('.auth-link').length).toBe(1);
  });

  it('renders signup link', () => {
    expect(wrapper.contains('SIGN UP')).toBe(true);
    expect(wrapper.contains("SIGN IN")).toBe(false);
  });

  it('renders signup link', () => {
    wrapper.setProps({ viewType: 2 });
    expect(wrapper.contains("SIGN UP")).toBe(false);
    expect(wrapper.contains("SIGN IN")).toBe(true);
  });
  
  it('sets viewType to 2', () => {
    wrapper.setProps({ viewType: 1 });
    const spy = jest.spyOn(props, 'setView');

    expect(wrapper.find('Link').length).toBe(1);
    wrapper.find('Link').simulate('click', {});
    expect(spy).toHaveBeenCalled();
  });

  it('sets viewType to 1', () => {
    wrapper.setProps({ viewType: 2 });
    const spy = jest.spyOn(props, 'setView');

    expect(wrapper.find('Link').length).toBe(1);
    wrapper.find('Link').simulate('click', {});
    expect(spy).toHaveBeenCalled();
  });
});
