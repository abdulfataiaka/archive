import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { loadAuthors, deleteAuthor } from '../../actions/authorActions';

class Authors extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  authorHasCourse = (authorId) => {
    const { courses } = this.props;

    return courses.some(
      course => (course.authorId === authorId)
    );
  }

  deleteAuthorHandler = ({ target: { name: authorId } }) => {
    const { deleteAuthorAction } = this.props;
    if (this.authorHasCourse(authorId)) {
      toastr.error('Cannot delete an author that has a course');
    } else {
      deleteAuthorAction(authorId)
        .then(() => {
          toastr.success('Author deleted successfully');
        })
        .catch(() => {
          toastr.error('Error occured while deleting author');
        });
    }
  }

  render() {
    const { authors } = this.props;

    return (
      <table className="table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Author Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          { authors.map((author, index) => (
            <tr key={author.id}>
              <td>{ index + 1 }</td>
              <td>{ `${author.firstName} ${author.lastName}` }</td>
              <td>
                <button
                  type="button"
                  name={author.id}
                  className="btn-sm btn-danger tb-btn"
                  onClick={this.deleteAuthorHandler}
                >
                  Delete
                </button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    );
  }
}

Authors.propTypes = {
  authors: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  courses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  deleteAuthorAction: PropTypes.func.isRequired
};

const mapStateToProps = ({ authors, courses }) => ({
  authors,
  courses
});

const mapDispatchTopProps = {
  loadAuthors,
  deleteAuthorAction: deleteAuthor
};

export default connect(mapStateToProps, mapDispatchTopProps)(Authors);
