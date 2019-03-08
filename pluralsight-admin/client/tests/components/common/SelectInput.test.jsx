import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import SelectInput from '../../../components/common/SelectInput';

describe('SelectInput Component', () => {
  const wrapper = shallow(
    <SelectInput
      name="authorId"
      label="Author"
      value="1"
      defaultOption="Select Author"
      options={[{ text: 'hello', value: 1 }]}
      onChange={() => {}}
      error="error"
    />
  );

  it('should render SelectInput component', () => {
    expect(wrapper.length).to.equal(1);
  });

  it('should render div element', () => {
    expect(wrapper.type()).to.equal('div');
  });

  it('should render label element', () => {
    expect(wrapper.find('div').find('label').length).to.equal(1);
  });

  it('should render select element', () => {
    const select = wrapper.find('div').find('div').find('select');

    expect(select.length).to.equal(1);
    expect(select.find('option')).to.contain('hello');
  });
});
