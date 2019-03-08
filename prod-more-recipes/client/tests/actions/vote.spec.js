import expect from 'expect';
import moxios from 'moxios';
import { setUserVoteForView } from '../../actions/voteActions';
import factory from '../factory';
import mockStore from '../factory/mockStore';
import actionTypes from '../../actions/actionTypes';

describe('Testing vote APIs', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('Should dispatch only SET_USER_VIEW_VOTE action with vote = { vote: 2 }', (done) => {
    const { token, recipeId } = { token: 'sfsguhgfuhshfshfs', recipeId: 1 };
    moxios.stubRequest(`/api/v1/recipes/${recipeId}/vote`, {
      status: 200,
      response: { vote: { vote: 2 } },
    });
    const store = mockStore({});
    const expectedAction = [
      {
        type: actionTypes.SET_USER_VIEW_VOTE,
        vote: { vote: 2 },
      },
    ];
    store.dispatch(setUserVoteForView(token, recipeId))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    done();
  });

  it('Should dispatch only SET_USER_VIEW_VOTE action with vote = null', (done) => {
    const { token, recipeId } = { token: 'sfsguhgfuhshfshfs', recipeId: 1 };
    moxios.stubRequest(`/api/v1/recipes/${recipeId}/vote`, {
      status: 200,
      response: { vote: null },
    });
    const store = mockStore({});
    const expectedAction = [
      {
        type: actionTypes.SET_USER_VIEW_VOTE,
        vote: null,
      },
    ];
    store.dispatch(setUserVoteForView(token, recipeId))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    done();
  });

  it('Should dispatch only SET_USER_VIEW_VOTE action with vote = null', (done) => {
    const { token, recipeId } = { token: 'sfsguhgfuhshfshfs', recipeId: 1 };
    moxios.stubRequest(`/api/v1/recipes/${recipeId}/vote`, {
      status: 400,
      response: null,
    });
    const store = mockStore({});
    const expectedAction = [
      {
        type: actionTypes.SET_USER_VIEW_VOTE,
        vote: null,
      },
    ];
    store.dispatch(setUserVoteForView(token, recipeId))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    done();
  });
});
