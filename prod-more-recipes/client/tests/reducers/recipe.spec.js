import expect from 'expect';
import recipe, { initialState } from '../../reducers/recipe';
import actionTypes from '../../actions/actionTypes';

const dispatch = action => recipe(initialState, action);

describe('Testing recipe reducer', () => {
  it('Should', (done) => {
    const state = dispatch({
      type: actionTypes.SET_USER_VIEW_VOTE,
      vote: { vote: 2 },
    });
    expect(state.vote).toEqual({ vote: 2 });
    done();
  });

  it('Should', (done) => {
    const state = dispatch({
      type: actionTypes.SET_VIEW_RECIPE,
      recipe: {
        Reviews: [],
      },
    });
    expect(state.recipeStatus).toEqual(null);
    expect(state.recipe).toEqual({ Reviews: [] });
    done();
  });

  it('Should', (done) => {
    const state = dispatch({
      type: actionTypes.UNSET_VIEW_RECIPE,
    });
    expect(state).toEqual(initialState);
    done();
  });

  it('Should', (done) => {
    const state = recipe({ ...initialState, recipe: { Reviews: [] } }, {
      type: actionTypes.REVIEW_POSTED,
      review: 'new comment',
    });
    expect(state).toEqual({ ...initialState, recipe: { Reviews: ['new comment'] } });
    done();
  });

  it('Should', (done) => {
    const state = dispatch({
      type: actionTypes.SET_VIEW_RECIPE_STATUS,
      status: 'new status',
    });
    expect(state.recipeStatus).toEqual('new status');
    done();
  });

  it('Should set vote to 2 for upvote', (done) => {
    const state = recipe(
      { ...initialState, recipe: { id: 3, Reviews: [] } },
      {
        type: actionTypes.UPVOTE_RECIPE,
        recipeId: 3,
      },
    );
    expect(state.vote).toEqual({ vote: 2 });
    done();
  });

  it('Should remove upvote and set vote to 0', (done) => {
    const state = recipe(
      { ...initialState, vote: { vote: 2 }, recipe: { id: 3, Reviews: [] } },
      {
        type: actionTypes.UPVOTE_RECIPE,
        recipeId: 3,
      },
    );
    expect(state.vote).toEqual({ vote: 0 });
    done();
  });

  it('Should set state back to initialState', (done) => {
    const state = dispatch({
      type: actionTypes.LOGOUT,
    });
    expect(state).toEqual(initialState);
    done();
  });

  it('Should set vote to 1 for downvote', (done) => {
    const state = recipe(
      { ...initialState, recipe: { id: 3, Reviews: [] } },
      {
        type: actionTypes.DOWNVOTE_RECIPE,
        recipeId: 3,
      },
    );
    expect(state.vote).toEqual({ vote: 1 });
    done();
  });

  it('Should remove downvote and set vote to 0', (done) => {
    const state = recipe(
      { ...initialState, vote: { vote: 1 }, recipe: { id: 3, Reviews: [] } },
      {
        type: actionTypes.DOWNVOTE_RECIPE,
        recipeId: 3,
      },
    );
    expect(state.vote).toEqual({ vote: 0 });
    done();
  });

  it('Should remove downvote and set vote to 2 for upvote', (done) => {
    const state = recipe(
      { ...initialState, vote: { vote: 1 }, recipe: { id: 3, Reviews: [] } },
      {
        type: actionTypes.UPVOTE_RECIPE,
        recipeId: 3,
      },
    );
    expect(state.vote).toEqual({ vote: 2 });
    done();
  });

  it('Should remove upvote and set vote to 1 for downvote', (done) => {
    const state = recipe(
      { ...initialState, vote: { vote: 2 }, recipe: { id: 3, Reviews: [] } },
      {
        type: actionTypes.DOWNVOTE_RECIPE,
        recipeId: 3,
      },
    );
    expect(state.vote).toEqual({ vote: 1 });
    done();
  });

  it('Should return previous state if not recipe during upvote', (done) => {
    const state = recipe(
      { ...initialState, recipe: { id: 2, Reviews: [] } },
      {
        type: actionTypes.UPVOTE_RECIPE,
        recipeId: 3,
      },
    );
    expect(state).toEqual({ ...initialState, recipe: { id: 2, Reviews: [] } });
    done();
  });

  it('Should return previous state if not recipe during downvote', (done) => {
    const state = recipe(
      { ...initialState, recipe: { id: 2, Reviews: [] } },
      {
        type: actionTypes.DOWNVOTE_RECIPE,
        recipeId: 3,
      },
    );
    expect(state).toEqual({ ...initialState, recipe: { id: 2, Reviews: [] } });
    done();
  });
});
