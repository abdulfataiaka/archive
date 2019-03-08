import { expect } from 'chai';
import fullmount from '../../utils/fullmount';
import mockStore from '../../__mocks__/store';

import Courses from '../../../components/Courses/Index';

describe('Courses Component', () => {
  const store = mockStore({
    courses: [{ id: 1 }]
  });

  const props = {
    history: {
      push: () => {}
    }
  };

  const wrapper = fullmount(Courses, props, store);
  const coursesWrapper = wrapper.find(Courses);

  it('should render Courses component', () => {
    expect(wrapper.length).to.equal(1);
  });

  it('should render h1 element', () => {
    expect(coursesWrapper.find('h1'))
      .to.contain('Courses');
  });

  it('should render add course button', () => {
    expect(coursesWrapper.find('button'))
      .to.contain('Add Course');
  });

  it('should render CourseList component', () => {
    expect(coursesWrapper.find('table').length)
      .to.equal(1);
  });
});
