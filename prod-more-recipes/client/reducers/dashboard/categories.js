import actionTypes from '../../actions/actionTypes';

export const initialState = {
  userCategories: null,
  // null | loading | error
  userCategoriesStatus: null,

  userDeleteCategoriesStatus: null,
  userAddCategoryStatus: null,

};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_CATEGORIES:
      return {
        ...state,
        userCategories: action.categories,
        userCategoriesStatus: null,
      };
    case actionTypes.LOGOUT:
      return initialState;

    case actionTypes.SET_USER_CATEGORIES_STATUS:
      return {
        ...state,
        userCategoriesStatus: action.status,
      };
    case actionTypes.SET_ADD_CATEGORY_STATUS:
      return {
        ...state,
        userAddCategoryStatus: action.status,
      };
    case actionTypes.CATEGORY_ADDED:
      return {
        ...state,
        userAddCategoryStatus: null,
        userCategories: [
          action.newCategory,
          ...state.userCategories,
        ],
      };
    case actionTypes.USER_CATEGORY_DELETED:
      return {
        ...state,
        userCategories: state.userCategories.filter(category => `${category.id}` !== `${action.categoryId}`),
        userDeleteCategoriesStatus: null,
      };
    case actionTypes.SET_CATEGORY_DELETE_STATUS:
      return {
        ...state,
        userDeleteCategoriesStatus: action.status,
      };
    default:
      return state;
  }
};
