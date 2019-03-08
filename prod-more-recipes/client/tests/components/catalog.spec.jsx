import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import expect from 'expect';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import factory from '../factory';
import mockStore from '../factory/mockStore';


// Import needed components
import Catalog from '../../components/Catalog';

// Configure enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Writing test suites
describe('Testing Catalog and Search component', () => {
  const catalog = factory.getMock('catalog');
  const recipe = factory.getMock('recipe');
  const recipes = [recipe, { ...recipe, id: 49 }];
  const auth = factory.getMock('auth');
  const props = {
    setCatalogRecipesStatus: () => {},
    loadCatalogRecipes: () => {},
    recipes,
    pagination: { page: 1, totalCount: 2, pageCount: 1 },
  };
  const storeContent = {
    auth,
    catalog: {
      recipes,
      pagination: { page: 1, totalCount: 2, pageCount: 2 },
      recipesStatus: null,
      isSearch: false,
    },
  };

  describe('Testing when catalog has no recipes', () => {
    const store = mockStore({
      ...storeContent,
      catalog: {
        ...storeContent.catalog,
        recipes: [],
      },
    });
    const CatalogWrapper = mount((
      <Provider store={store}>
        <BrowserRouter>
          <Catalog {...props} />
        </BrowserRouter>
      </Provider>
    ));

    it('Should render without error in loading mode', (done) => {
      expect(CatalogWrapper.find('div').length).toEqual(13);
      expect(CatalogWrapper.find('h4').prop('children'))
        .toEqual('There are no recipes in catalog yet');
      done();
    });
  });

  describe('Testing when catalog component is loading', () => {
    const store = mockStore({
      ...storeContent,
      catalog: {
        ...storeContent.catalog,
        recipesStatus: 'loading',
      },
    });
    const CatalogWrapper = mount((
      <Provider store={store}>
        <BrowserRouter>
          <Catalog {...props} />
        </BrowserRouter>
      </Provider>
    ));

    it('Should render without error in loading mode', (done) => {
      expect(CatalogWrapper.find('div').length).toEqual(14);
      expect(CatalogWrapper.find('h4').prop('children'))
        .toEqual('Loading catalog recipes');
      done();
    });
  });

  describe('Testing when catalog component has loading error', () => {
    const store = mockStore({
      ...storeContent,
      catalog: {
        ...storeContent.catalog,
        recipesStatus: 'error',
      },
    });
    const CatalogWrapper = mount((
      <Provider store={store}>
        <BrowserRouter>
          <Catalog {...props} />
        </BrowserRouter>
      </Provider>
    ));

    it('Should render without error in loading mode', (done) => {
      expect(CatalogWrapper.find('div').length).toEqual(13);
      expect(CatalogWrapper.find('h4').prop('children'))
        .toEqual('Unable to load catalog recipes');
      done();
    });
  });

  describe('Testing when there are loaded recipes', () => {
    const store = mockStore({ ...storeContent });
    const CatalogWrapper = mount((
      <Provider store={store}>
        <BrowserRouter>
          <Catalog {...props} />
        </BrowserRouter>
      </Provider>
    ));

    it('Should pagination with pagination', (done) => {
      CatalogWrapper.find('Pagination').find('button').at(2).simulate('click');
      done();
    });

    it('Should render without error', (done) => {
      expect(CatalogWrapper.length).toEqual(1);
      expect(toJson(CatalogWrapper)).toMatchSnapshot();
      expect(CatalogWrapper.length).toEqual(1);
      expect(toJson(CatalogWrapper)).toMatchSnapshot();
      done();
    });

    it('Should render without error when there are recipes in state', (done) => {
      expect(CatalogWrapper.find('Recipe').length).toEqual(2);
      done();
    });

    it('Should simulate search and reload button clicks', (done) => {
      const searchButSpy = sinon.spy(CatalogWrapper.find('Catalog').instance(), 'search');
      expect(CatalogWrapper.find('Catalog').instance().state.query).toEqual('');
      CatalogWrapper.find('Search').find('button').at(0).simulate('click', {
        preventDefault: () => {},
      });
      expect(CatalogWrapper.find('Search').instance().state.error).toEqual(true);
      CatalogWrapper.find('Catalog').instance().setState({ query: 'hello' });
      CatalogWrapper.find('Search').find('button').at(0).simulate('click', {
        preventDefault: () => {},
      });
      CatalogWrapper.find('Search').find('input').at(0).simulate('change');
      CatalogWrapper.find('Search').find('input').at(0).simulate('focus');
      CatalogWrapper.find('Search').find('button').at(1).simulate('click');
      expect(searchButSpy.called).toEqual(true);
      done();
    });
  });
});
