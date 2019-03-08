import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import NotFound from '../../components/NotFound';

describe('NotFound Component', () => {
  const wrapper = shallow(<NotFound />);

  it('should render a single div', () => {
    expect(wrapper.find('div').length).to.equal(1);
  });

  it('should render not found text', () => {
    expect(wrapper).to.contain('Page not found');
  });
});
