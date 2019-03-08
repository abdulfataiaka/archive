import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Loader from '../../../components/common/Loader';

describe('Loader Component', () => {
  const wrapper = shallow(<Loader show />);

  it('should render Loader component', () => {
    expect(wrapper.length).to.equal(1);
  });

  it('should have loadign text', () => {
    expect(wrapper.find('div')).to.contain('Loading ...');
  });
});
