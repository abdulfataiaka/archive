import React from 'react';
import { shallow } from 'enzyme';
import App from '../../components/App'; 

describe('App Component', () => {
  const wrapper = shallow(<App />);
  
  it('renders the App component', () => {
    expect(wrapper.length).toBe(1);
  });

  it('renders the header component', () => {
    expect(wrapper.find('Connect(Header)').length).toBe(1);
  });

  it('renders the switch component', () => {
    expect(wrapper.find('Switch').length).toBe(1);
  });

  it('renders two Route components', () => {
    expect(wrapper.find('Route').length).toBe(2);
  });
});
