import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import CourseForm from '../../../components/Courses/CourseForm';
import SelectInput from '../../../components/common/SelectInput';
import TextInput from '../../../components/common/TextInput';

describe('CourseForm Component', () => {
  const props = {
    course: {
      title: '',
      authorId: 'athor-name',
      category: 'category',
      length: ''
    },
    allAuthors: [],
    onSave: () => {},
    onChange: () => {},
    saving: false,
    errors: { title: '' }
  };

  const wrapper = shallow(<CourseForm {...props} />);

  it('should render CourseForm component', () => {
    expect(wrapper.type()).to.equal('form');
  });

  it('should render 1 SelectInput components', () => {
    expect(wrapper.find(SelectInput).length).to.equal(1);
  });

  it('should render 3 TextInput components', () => {
    expect(wrapper.find(TextInput).length).to.equal(3);
  });
});
