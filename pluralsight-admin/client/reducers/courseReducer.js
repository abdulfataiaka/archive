import {
  LOAD_COURSES_SUCCESS,
  CREATE_COURSE_SUCCESS,
  UPDATE_COURSE_SUCCESS,
  DELETE_COURSE_SUCCESS
} from '../helpers/actionTypes';
import { coursesInitialState } from '../helpers/initialStates';

export default (state = coursesInitialState, action) => {
  switch (action.type) {
    case LOAD_COURSES_SUCCESS:
      return action.courses;
    case CREATE_COURSE_SUCCESS:
      return [
        { ...action.course },
        ...state.filter(course => course.id !== action.course.id)
      ];
    case DELETE_COURSE_SUCCESS:
      return [
        ...(
          state.filter(course => course.id !== action.courseId)
        )
      ];
    case UPDATE_COURSE_SUCCESS:
      return [
        ...state.map((course) => {
          if (course.id === action.course.id) {
            return action.course;
          }
          return course;
        })
      ];
    default:
      return state;
  }
};
