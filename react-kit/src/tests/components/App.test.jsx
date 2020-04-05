import { expect } from 'chai';
import fullmount from '../utils/fullmount';

import App from '../../components/App';
import Routes from '../../components/Routes';

describe('App Component', () => {
  const wrapper = fullmount(App);

  it('should render Routes component', () => {
    expect(wrapper.find(Routes).length).to.equal(1);
  });
});
