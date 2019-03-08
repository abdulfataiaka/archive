import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CourseList from './CourseList';

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  courseRow = (course, index) => (
    <div key={index}>
      { course.title}
    </div>
  );

  redirectToAddCoursePage = () => {
    const { history } = this.props;

    history.push('/course');
  };

  render() {
    const { courses, isLoading } = this.props;
    return (
      <div>
        <h1>Courses</h1>

        <button
          type="submit"
          className="btn btn-primary mb-4"
          onClick={this.redirectToAddCoursePage}
        >
          Add Course
        </button>

        {
          courses.length > 0
            ? <CourseList courses={courses} />
            : (
              <div className="mt-5 empty-content">
                {
                  !isLoading
                    ? 'There are no courses avaialable at this time'
                    : 'Loading available courses ...'
                }
              </div>
            )
        }
      </div>
    );
  }
}

Courses.propTypes = {
  history: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
  courses: PropTypes.arrayOf(
    PropTypes.shape({})
  ),
};

const mapStateToProps = ({ courses, ajaxStatus }) => ({
  courses,
  isLoading: ajaxStatus > 0
});

export default connect(mapStateToProps, null)(Courses);
