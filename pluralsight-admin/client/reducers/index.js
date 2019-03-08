import { combineReducers } from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import ajaxStatus from './ajaxStatusReducer';

export default combineReducers({
  courses,
  authors,
  ajaxStatus,
});
