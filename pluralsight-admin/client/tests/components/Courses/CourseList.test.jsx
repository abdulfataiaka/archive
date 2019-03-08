import { expect } from 'chai';
import fullmount from '../../utils/fullmount';

import mockStore from '../../__mocks__/store';
import CourseListRow from '../../../components/Courses/CourseListRow';
import CourseList from '../../../components/Courses/CourseList';

describe('CourseList Component', () => {
  const props = {
    courses: []
  };

  const store = mockStore({});
  let wrapper = fullmount(CourseList, { ...props }, store);

  it('should render no CourseList component', () => {
    expect(wrapper.find(CourseList).length).to.equal(1);
  });

  it('should render no CourseListRow component', () => {
    expect(wrapper.find(CourseListRow).length).to.equal(0);
  });

  it('should render CourseList and one CourseListRow component', () => {
    props.courses.push({ id: 1 });
    wrapper = fullmount(CourseList, { ...props }, store);

    expect(wrapper.find(CourseList).length).to.equal(1);
    expect(wrapper.find(CourseListRow).length).to.equal(1);
  });
});
