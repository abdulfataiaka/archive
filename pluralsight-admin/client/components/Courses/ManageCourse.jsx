import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import toastr from 'toastr';
import CourseForm from './CourseForm';
import { authorsToDropdownFormat } from '../../helpers/authorsHelper';
import { getCourseById } from '../../helpers/coursesHelper';
import { saveCourse as saveCourseAction } from '../../actions/courseActions';

class ManageCourse extends Component {
  constructor(props) {
    super(props);
    const { course } = props;

    this.state = {
      course: { ...course },
      errors: {},
      saving: false,
      courseValid: true
    };
  }

  componentWillMount() {
    this.checkCourseId(this.props);
    this.setState({ saving: false });
  }

  componentWillReceiveProps(nextProps) {
    const { course: prevPropsCourse } = this.props;
    const { course: nextPropsCourse } = nextProps;

    if (prevPropsCourse.id !== nextPropsCourse.id) {
      this.setState({
        course: { ...nextPropsCourse }
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    const { course: prevPropsCourse } = this.props;
    const { course: nextPropsCourse } = nextProps;

    if (prevPropsCourse.id !== nextPropsCourse.id) {
      this.checkCourseId(nextProps);
    }

    return true;
  }

  checkCourseId = (props) => {
    const {
      courses,
      course: nextCourse,
      match: { params: { id: courseId } },
    } = props;

    if (courseId) {
      this.setState({ course: { ...nextCourse } });

      if (courses.some(course => course.id === courseId)) {
        this.setState({ courseValid: true });
      } else {
        this.setState({ courseValid: false });
      }
    }
  }

  onChangeHandler = (event) => {
    const { name: field, value } = event.target;
    this.setState(({ course }) => ({
      course: {
        ...course,
        [field]: value
      }
    }));
  }

  validateCourse = (course) => {
    const {
      title, authorId, category, length
    } = course;

    let message = true;

    if (title.trim().length === 0) {
      message = 'Title must have at least one character';
    }

    else if (authorId.trim().length === 0) {
      message = 'No author has been selected';
    }

    else if (category.trim().length === 0) {
      message = 'Category must have at least one character';
    }

    else if (!length.match(/^[0-9]+(:[0-9]+){1,2}$/)) {
      message = 'Enter a valid course length';
    }

    return message;
  }

  saveCourseHandler = (event) => {
    event.preventDefault();
    const { course } = this.state;
    const { saveCourse } = this.props;
    const { router: { history } } = this.context;

    const check = this.validateCourse(course);
    if (check !== true) {
      toastr.error(check);
      return;
    }

    this.setState({ saving: true });

    saveCourse(course)
      .then(() => {
        history.push('/courses');
        toastr.success('Course Saved');
      })
      .catch((error) => {
        toastr.error(error);
        this.setState({ saving: false });
      });
  }

  render() {
    const {
      course, errors, saving, courseValid
    } = this.state;

    const { authors } = this.props;

    return (
      <div>
        <h1>Manage Course</h1>
        { courseValid
          ? (
            <CourseForm
              saving={saving}
              onChange={this.onChangeHandler}
              allAuthors={authors}
              onSave={this.saveCourseHandler}
              course={course}
              errors={errors}
            />
          )
          : (
            <div className="empty-content mt-5">
              ERR 404 : The selected course was not found
            </div>
          )
        }
      </div>
    );
  }
}

ManageCourse.propTypes = {
  course: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
  authors: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  saveCourse: PropTypes.func.isRequired
};

ManageCourse.contextTypes = {
  router: PropTypes.shape({})
};

const mapStateToProps = ({ courses, authors }, { match }) => {
  const { params: { id: courseId } } = match;

  let course = {
    id: '',
    watchHref: '',
    title: '',
    authorId: '',
    length: '',
    category: ''
  };

  if (courseId && courses.length > 0) {
    const tempCourse = getCourseById(courses, courseId);
    course = tempCourse || course;
  }

  return {
    course,
    courses,
    authors: authorsToDropdownFormat(authors)
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  saveCourse: saveCourseAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ManageCourse);
