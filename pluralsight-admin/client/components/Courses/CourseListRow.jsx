/* eslint-disable react/jsx-no-target-blank */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CourseListRow = ({ course, onDeleteClick }) => (
  <tr>
    <td>
      <a
        href={course.watchHref}
        target="_blank"
      >
        Watch
      </a>
    </td>
    <td>
      <Link to={`/course/${course.id}`}>
        {course.title}
      </Link>
    </td>
    <td>{course.authorId}</td>
    <td>{course.category}</td>
    <td>{course.length}</td>
    <td>
      <button
        type="button"
        name={course.id}
        className="btn-sm btn-danger tb-btn"
        onClick={onDeleteClick}
      >
        Delete
      </button>
    </td>
  </tr>
);

CourseListRow.propTypes = {
  course: PropTypes.shape({}).isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default CourseListRow;
