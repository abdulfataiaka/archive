import React from 'react';
import { shallow } from 'enzyme';
import { Auth } from '../../../components/Auth/Index';
import { AuthPropMock } from '../../mocks/components/Auth';

const props = AuthPropMock.index();
const wrapper = shallow(<Auth { ...props } />);

describe('Auth Component', () => {
  it('renders the Auth component', () => {
    expect(wrapper.length).toBe(1);
  });

  it('updates loading on submit', () => {
    const loading = wrapper.state().loading;
    wrapper.instance().onSubmit({ preventDefault: jest.fn() });
    expect(wrapper.state().loading).toBe(!loading);
  });

  it('updates state on change', () => {
    const email = 'test@email.com';
    wrapper.instance().onChange({ target: { name: 'email', value: email } });
    expect(wrapper.state().email).toBe(email);
  });

  it('updates state on change of viewType', () => {
    wrapper.setProps({ viewType: 2 });
    expect(wrapper.state().loading).toBe(false);
    expect(wrapper.state().email).toBe('');
    expect(wrapper.state().password).toBe('');
  });

  it('does not updates state on no viewType change', () => {
    const email = 'nochange@gmail.com';
    wrapper.setState({ email });
    const viewType = wrapper.instance().props.viewType;
    wrapper.setProps({ viewType });
    expect(wrapper.state().email).toBe(email);
  });
});
