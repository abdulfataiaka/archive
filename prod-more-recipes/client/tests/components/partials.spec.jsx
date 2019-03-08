import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import { Route, Redirect } from 'react-router-dom';
import toJson from 'enzyme-to-json';

import store from '../../store';

// Import needed components
import ConnectToaster, { Toaster } from '../../components/partials/Toaster';
import LoadError from '../../components/partials/LoadError';
import Footer from '../../components/partials/Footer';
import ConnectHeader, { Header } from '../../components/partials/Header';
import ConnectPagination, { Pagination } from '../../components/partials/Pagination';

// Configure enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Writing test suites for partial components
describe('Testing Partial components', () => {
  describe('Testing Toaster component', () => {
    const props = {
      hideToaster: () => {},
    };
    const toasterSpy = sinon.spy(props, 'hideToaster');
    it('Should connect to the store', (done) => {
      const connectToasterWrapper = shallow((
        <ConnectToaster
          store={store}
        />
      ));
      done();
    });

    it('Should render toaster without error', (done) => {
      const toasterWrapper = shallow(<Toaster {...props} />);
      expect(toasterWrapper.length).toEqual(1);
      expect(toasterWrapper.find('button')
        .hasClass('zero-button text-left')).toEqual(true);
      done();
    });

    it('Should call the hideToaster action creator', (done) => {
      const toasterWrapper = shallow((
        <Toaster
          message="hello there"
          {...props}
        />));
      toasterWrapper.find('button').at(0).simulate('click', {
        preventDefault: () => {},
      });
      expect(toasterSpy.called).toEqual(true);
      done();
    });
  });

  describe('Testing LoadError component', () => {
    it('Should render with image loader', (done) => {
      const loadErrorWrapper = shallow(<LoadError mode="loading" />);

      expect(loadErrorWrapper.length).toEqual(1);
      expect(loadErrorWrapper.find('div').at(1)
        .hasClass('loader-image-div')).toEqual(true);
      expect(loadErrorWrapper.find('div').at(1).find('img')
        .prop('src')).toEqual('test-file-stub');
      done();
    });

    it('Should render with error', (done) => {
      const loadErrorWrapper = shallow(<LoadError mode="error" />);

      expect(loadErrorWrapper.length).toEqual(1);
      expect(loadErrorWrapper.find('h1 i').hasClass('fa fa-exclamation-triangle'))
        .toEqual(true);
      done();
    });

    it('Should render with no content', (done) => {
      const loadErrorWrapper = shallow(<LoadError />);

      expect(loadErrorWrapper.length).toEqual(1);
      expect(loadErrorWrapper.find('h1 i').hasClass('fa fa-warning'))
        .toEqual(true);
      done();
    });
  });

  describe('Testing Footer component', () => {
    it('Should render without error', (done) => {
      const footerWrapper = shallow(<Footer />);

      expect(footerWrapper.length).toEqual(1);
      done();
    });
  });

  describe('Testing Header component', () => {
    it('Should render without error', (done) => {
      const headerWrapper = shallow(<Header />);
      const connectHeaderWrapper = shallow(<ConnectHeader store={store} />);

      expect(headerWrapper.length).toEqual(1);
      expect(toJson(headerWrapper)).toMatchSnapshot();
      done();
    });
  });

  describe('Testing Pagination component', () => {
    it('Should render without error', (done) => {
      const paginationWrapper = shallow(<Pagination />);
      expect(paginationWrapper.length).toEqual(1);
      expect(toJson(paginationWrapper)).toMatchSnapshot();
      expect(paginationWrapper.find('ul').hasClass('pagination')).toEqual(true);
      done();
    });

    it('Should render with valid pagination and clicks the ', (done) => {
      const props = {
        paginate: () => {},
        pages: 2,
        active: 1,
      };
      const paginationWrapper = mount(<Pagination {...props} />);
      paginationWrapper.find('button').at(3).simulate('click');
      done();
    });

    it('Should render with valid pagination and clicks the ', (done) => {
      const props = {
        paginate: () => {},
        pages: 2,
        active: 2,
      };
      const paginationWrapper = mount(<Pagination {...props} />);
      const paginateSpy = sinon.spy(props, 'paginate');
      paginationWrapper.find('button').at(0).simulate('click');
      paginationWrapper.find('button').at(1).simulate('click');
      done();
    });
  });
});
