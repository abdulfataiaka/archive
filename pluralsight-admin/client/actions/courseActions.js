import {
  LOAD_COURSES_SUCCESS,
  CREATE_COURSE_SUCCESS,
  UPDATE_COURSE_SUCCESS,
  DELETE_COURSE_SUCCESS
} from '../helpers/actionTypes';
import courseApi from '../mockapi/courseApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusAction';

export const loadCoursesSuccess = courses => ({
  type: LOAD_COURSES_SUCCESS,
  courses
});

export const loadCourses = () => (dispatch) => {
  dispatch(beginAjaxCall());

  return (
    courseApi.getAllCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((error) => {
        dispatch(ajaxCallError());
        throw error;
      })
  );
};

export function createCourseSuccess(course) {
  return {
    type: CREATE_COURSE_SUCCESS,
    course
  };
}

export function updateCourseSuccess(course) {
  return {
    type: UPDATE_COURSE_SUCCESS,
    course
  };
}

export function deleteCourseSuccess(courseId) {
  return {
    type: DELETE_COURSE_SUCCESS,
    courseId
  };
}

export const saveCourse = course => (dispatch) => {
  dispatch(beginAjaxCall());

  return (
    courseApi.saveCourse(course)
      .then(savedCourse => (
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse))
      ))
      .catch((error) => {
        dispatch(ajaxCallError());
        throw error;
      })
  );
};


export const deleteCourse = courseId => (dispatch) => {
  dispatch(beginAjaxCall());

  return (
    courseApi.deleteCourse(courseId)
      .then(() => {
        dispatch(deleteCourseSuccess(courseId));
      })
      .catch((error) => {
        dispatch(ajaxCallError());
        throw error;
      })
  );
};
