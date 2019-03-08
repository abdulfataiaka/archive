import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import About from '../../../components/About/Index';

describe('About Component', () => {
  const wrapper = shallow(<About />);

  it('should render About component', () => {
    expect(wrapper.type()).to.equal('div');
  });

  it('should render About component', () => {
    expect(wrapper.find('div').find('h1')).to.contain('About');
  });
});
