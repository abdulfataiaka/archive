import { expect } from 'chai';
import { NavLink } from 'react-router-dom';
import fullmount from '../../utils/fullmount';
import mockStore from '../../__mocks__/store';
import Loader from '../../../components/common/Loader';

import Header from '../../../components/common/Header';

describe('Header Component', () => {
  const store = mockStore({});
  const wrapper = fullmount(Header, {}, store);

  it('should render Header component', () => {
    expect(wrapper.length).to.equal(1);
  });

  it('should have above three nav links', () => {
    expect(wrapper.find(NavLink).length).to.be.greaterThan(3);
  });

  it('should have a loader', () => {
    expect(wrapper.find(Loader).length).to.equal(1);
  });
});
