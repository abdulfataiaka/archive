import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Loader from './Loader';

const Header = ({ coursesCount, loading }) => (
  <nav>
    <NavLink exact to="/" activeClassName="active">Home</NavLink>
    { ' | ' }
    <NavLink exact to="/courses" activeClassName="active">
      Courses
      <span>{ coursesCount }</span>
    </NavLink>
    { ' | ' }
    <NavLink exact to="/authors" activeClassName="active">Authors</NavLink>
    { ' | ' }
    <NavLink exact to="/about" activeClassName="active">About</NavLink>

    <Loader show={loading} />
  </nav>
);

Header.propTypes = {
  loading: PropTypes.bool.isRequired,
  coursesCount: PropTypes.number.isRequired
};

const mapStateToProps = ({ courses, ajaxStatus }) => ({
  loading: ajaxStatus > 0,
  coursesCount: Array.isArray(courses) ? courses.length : 0
});

export default connect(mapStateToProps, null)(Header);
