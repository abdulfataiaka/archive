import actionTypes from '../actions/actionTypes';

export const initialState = {
  recipe: null,
  recipeStatus: null,

  vote: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_VIEW_VOTE:
      return {
        ...state,
        vote: action.vote,
      };
    case actionTypes.SET_VIEW_RECIPE:
      return {
        ...state,
        recipe: {
          ...action.recipe,
          Reviews: action.recipe.Reviews.reverse(),
        },
        recipeStatus: null,
      };

    case actionTypes.UNSET_VIEW_RECIPE:
      return initialState;

    case actionTypes.REVIEW_POSTED:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          Reviews: [
            action.review,
            ...state.recipe.Reviews,
          ],
        },
      };
    case actionTypes.SET_VIEW_RECIPE_STATUS:
      return {
        ...state,
        recipeStatus: action.status,
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        vote: null,
      };
    case actionTypes.UPVOTE_RECIPE:
      if (state.recipe.id === action.recipeId) {
        let { vote } = state.vote !== null ? state.vote : { vote: 0 };
        const recipe = { ...state.recipe };
        if (vote === 2) {
          recipe.upvotes -= 1;
          vote = 0;
        } else if (vote === 1) {
          recipe.upvotes += 1;
          recipe.downvotes -= 1;
          vote = 2;
        } else {
          recipe.upvotes += 1;
          vote = 2;
        }
        return {
          ...state,
          recipe: { ...recipe },
          vote: { ...state.vote, vote },
        };
      }
      return state;

    case actionTypes.DOWNVOTE_RECIPE:
      if (state.recipe.id === action.recipeId) {
        let { vote } = state.vote !== null ? state.vote : { vote: 0 };
        const recipe = { ...state.recipe };
        if (vote === 1) {
          recipe.downvotes -= 1;
          vote = 0;
        } else if (vote === 2) {
          recipe.downvotes += 1;
          recipe.upvotes -= 1;
          vote = 1;
        } else {
          recipe.downvotes += 1;
          vote = 1;
        }
        return {
          ...state,
          recipe: { ...recipe },
          vote: { ...state.vote, vote },
        };
      } return state;

    default:
      return state;
  }
};
