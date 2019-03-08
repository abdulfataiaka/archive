import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import TextInput from '../../../components/common/TextInput';

describe('TextInput Component', () => {
  const wrapper = shallow(
    <TextInput
      name="category"
      label="Category"
      value="1"
      onChange={() => {}}
      error="1"
    />
  );

  it('should render TextInput component', () => {
    expect(wrapper.length).to.equal(1);
  });

  it('should render div element', () => {
    expect(wrapper.type()).to.equal('div');
  });

  it('should render label element', () => {
    expect(wrapper.find('div').find('label').length).to.equal(1);
  });

  it('should render select element', () => {
    const input = wrapper.find('div').find('div').find('input');
    expect(input.length).to.equal(1);
    expect(input.prop('type')).to.equal('text');
  });
});
