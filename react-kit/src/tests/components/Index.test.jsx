import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Index from '../../components/Home/Index';

describe('Index Component', () => {
  const wrapper = shallow(<Index />);

  it('should render a single div', () => {
    expect(wrapper.find('div').length).to.equal(1);
  });

  it('should render welcome text', () => {
    expect(wrapper).to.contain('Welcome to react starter kit');
  });
});
