import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';
import CourseListRow from './CourseListRow';
import { deleteCourse } from '../../actions/courseActions';

class CourseList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  deleteCourseHandler = ({ target: { name: courseId } }) => {
    const { deleteCourseAction } = this.props;

    deleteCourseAction(courseId).then(() => {
      toastr.success('Course deleted successfully');
    });
  }

  render() {
    const { courses } = this.props;

    return (
      <table className="table">
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Length</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            courses.map(course => (
              <CourseListRow
                key={course.id}
                course={course}
                onDeleteClick={this.deleteCourseHandler}
              />
            ))
          }
        </tbody>
      </table>
    );
  }
}

CourseList.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  deleteCourseAction: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  deleteCourseAction: deleteCourse
};

export default connect(null, mapDispatchToProps)(CourseList);
