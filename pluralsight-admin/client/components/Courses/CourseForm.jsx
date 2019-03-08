import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const CourseForm = ({
  course,
  allAuthors,
  onSave,
  onChange,
  saving,
  errors
}) => (
  <form>
    <TextInput
      name="title"
      label="Title"
      value={course.title}
      onChange={onChange}
      placeholder="Enter course title"
      error={errors.title}
    />

    <SelectInput
      name="authorId"
      label="Author"
      value={course.authorId}
      defaultOption="Select Author"
      options={allAuthors}
      onChange={onChange}
      error={errors.authorId}
    />

    <TextInput
      name="category"
      label="Category"
      value={course.category}
      onChange={onChange}
      placeholder="Enter category of course E.g Javascript"
      error={errors.category}
    />

    <TextInput
      name="length"
      label="Length"
      value={course.length}
      onChange={onChange}
      placeholder="Enter course length E.g 4:30"
      error={errors.length}
    />

    <input
      type="submit"
      disabled={saving}
      value={saving ? 'Saving...' : 'Save'}
      className="btn btn-primary"
      onClick={onSave}
    />
  </form>
);

CourseForm.propTypes = {
  course: PropTypes.shape({}).isRequired,
  allAuthors: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  errors: PropTypes.shape({}).isRequired
};

export default CourseForm;
