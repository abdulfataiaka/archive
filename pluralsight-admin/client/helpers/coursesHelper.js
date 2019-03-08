export const getCourseById = (courses, id) => {
  const course = courses.filter(courseItem => courseItem.id === id);
  if (course.length) return course[0];
  return null;
};

export default {};
