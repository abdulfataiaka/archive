import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import store from '../../store';
import rootReducer from '../../reducers';

const state = store.getState();

export default configureMockStore([thunk]);
