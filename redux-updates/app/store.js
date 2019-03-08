import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const middlewares = [ thunk ];

export default (initialState) => createStore(
  () => {},
  initialState,
  applyMiddleware(...middlewares)
);
