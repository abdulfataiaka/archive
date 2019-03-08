import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from '../../store';

// Import needed components
import App from '../../components/App';
import Header from '../../components/partials/Header';
import Toaster from '../../components/partials/Toaster';
import Modal from '../../components/Modal';
import Routes from '../../components/Routes';
import Footer from '../../components/partials/Footer';

// Configure enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Writing test suites
describe('Testing App component', () => {
  const appWrapper = shallow(<App store={store} />);

  it('Should render without exploding', (done) => {
    expect(appWrapper.length).toEqual(1);
    done();
  });

  it('Should only have the children props', (done) => {
    expect(Object.keys(appWrapper.props()).length).toEqual(1);
    expect(Object.keys(appWrapper.props())[0]).toEqual('children');
    done();
  });

  it('Should have six (5) children', (done) => {
    expect(appWrapper.prop('children').length).toEqual(5);
    done();
  });

  it('Should contain a single Header component', (done) => {
    expect(appWrapper.find(Header).length).toEqual(1);
    expect(appWrapper.contains(<Header />)).toEqual(true);
    done();
  });

  it('Should contain a single Modal component', (done) => {
    expect(appWrapper.find(Modal).length).toEqual(1);
    expect(appWrapper.contains(<Modal />)).toEqual(true);
    done();
  });

  it('Should contain a single Toaster component', (done) => {
    expect(appWrapper.find(Toaster).length).toEqual(1);
    expect(appWrapper.contains(<Toaster />)).toEqual(true);
    done();
  });

  it('Should contain a single Routes component', (done) => {
    expect(appWrapper.find(Routes).length).toEqual(1);
    expect(appWrapper.contains(<Routes />)).toEqual(true);
    done();
  });

  it('Should contain a single Routes component', (done) => {
    expect(appWrapper.find(Footer).length).toEqual(1);
    expect(appWrapper.contains(<Footer />)).toEqual(true);
    done();
  });

});
