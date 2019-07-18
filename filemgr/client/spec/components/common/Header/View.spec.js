import React from 'react';
import { shallow } from 'enzyme';
import View from '../../../../components/common/Header/View';
import { HeaderPropMock } from '../../../mocks/components/Header';

describe('Header View Component', () => {
  const props = HeaderPropMock.view()
  const wrapper = shallow(<View { ...props } />);

  it('renders the header element', () => {
    expect(wrapper.find('#header').length).toBe(1);
  });

  it('contains the text : File Transfer', () => {
    expect(wrapper.contains('File Transfer')).toBe(true);
  });

  it('renders the AuthLinkView Component', () => {
    expect(wrapper.find('AuthLinkView').length).toBe(1);
  });
});
