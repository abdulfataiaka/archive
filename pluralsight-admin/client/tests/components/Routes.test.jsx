import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Route, Switch } from 'react-router-dom';

import Routes from '../../components/Routes';

describe('Routes Component', () => {
  const wrapper = shallow(<Routes />);

  it('should render Routes component', () => {
    expect(wrapper.type()).to.equal(Switch);
  });

  it('should render above 6 routes component', () => {
    expect(wrapper.find(Switch).find(Route).length)
      .to.be.greaterThan(6);
  });
});
