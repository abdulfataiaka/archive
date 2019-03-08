import { expect } from 'chai';
import fullmount from '../utils/fullmount';
import mockStore from '../__mocks__/store';

import App from '../../components/App';
import Routes from '../../components/Routes';

describe('App Component', () => {
  const store = mockStore({});
  const wrapper = fullmount(App, {}, store);

  it('should render Routes component', () => {
    expect(wrapper.find(Routes).length).to.equal(1);
  });
});
