import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../../../components/common/Header/Index'; 

describe('Header Component', () => {
  const wrapper = shallow(<Header viewType={1} />);

  it('renders header', () => {
    expect(wrapper.length).toBe(1);
  });

  it('changes the view', () => {
    const viewType = 2;

    wrapper.setProps({
      setAuthViewType: () => {
        wrapper.setProps({ viewType });
      }
    });

    wrapper.instance().setView({ preventDefault: jest.fn() }, viewType);
    expect(wrapper.instance().props.viewType).toBe(2);
  });
});
