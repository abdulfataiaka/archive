import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import Home from '../../../components/Home/Index';

describe('Home Component', () => {
  const wrapper = shallow(<Home />);

  it('should render Home component', () => {
    expect(wrapper.type()).to.equal('div');
  });

  it('should render h1 element', () => {
    expect(wrapper.find('div').find('h1'))
      .to.contain('Pluralsight Administration');
  });

  it('should render p element', () => {
    expect(wrapper.find('div').find('p').length)
      .to.equal(1);
  });

  it('should render Link component', () => {
    expect(wrapper.find('div').find(Link).length)
      .to.equal(1);
  });
});
