import keyMirror from 'keymirror';

export default keyMirror({

  //  Authentication
  AUTH_SUCCESSFUL: null,
  AUTH_FAILED: null,
  LOGOUT: null,
  SET_AUTH_ERROR: null,
  SET_LOGGEDIN_USER: null,

  //  catalog recipes
  SET_CATALOG_RECIPES: null,
  SET_CATALOG_RECIPES_STATUS: null,

  //  popular recipes
  SET_POPULAR: null,
  SET_POPULAR_STATUS: null,

  //  reviews
  REVIEW_POSTED: null,

  //  favorite
  DELETE_FAVORITE: null,
  SET_FAVORITES: null,
  ADD_FAVORITE: null,
  SET_USER_FAVORITES_STATUS: null,
  SET_USER_FAVORITES: null,
  REMOVED_FROM_CATEGORY: null,

  //  voting
  UPVOTE_RECIPE: null,
  DOWNVOTE_RECIPE: null,

  // View page
  SET_VIEW_RECIPE: null,
  SET_VIEW_RECIPE_STATUS: null,
  UNSET_VIEW_RECIPE: null,
  SET_USER_VIEW_VOTE: null,

  // Modal
  OPEN_MODAL: null,
  HIDE_MODAL: null,

  // Toaster
  SHOW_TOASTER: null,
  HIDE_TOASTER: null,

  // Profile
  SET_USER_DETAILS_STATUS: null,
  SET_USER_DETAILS: null,
  PERSONAL_DETAILS_UPDATED: null,
  SET_PERSONAL_DETAILS_UPDATE_STATUS: null,
  SET_USER_PASSWORD_STATUS: null,

  //  Dashboard
  SET_DASHBOARD_LOADING: null,

  //  Categories
  SET_USER_CATEGORIES_STATUS: null,
  SET_USER_CATEGORIES: null,
  USER_CATEGORY_DELETED: null,
  SET_CATEGORY_DELETE_STATUS: null,
  CATEGORY_ADDED: null,
  SET_ADD_CATEGORY_STATUS: null,
  SET_ADD_TO_CATEGORY_STATUS: null,

  //  User RecipeS
  SET_USER_RECIPES: null,
  SET_USER_RECIPES_STATUS: null,
  USER_RECIPE_DELETED: null,
  SET_DELETE_USER_RECIPE_STATUS: null,

  //  Adding recipe
  SET_ADD_RECIPE_STATUS: null,

  //  Manage recipe
  RECIPE_ADDED: null,
  RECIPE_UPDATED: null,
  SET_MANAGE_RECIPE_ENTRY: null,
  SET_MANAGE_RECIPE_ENTRIES: null,
  SET_MANAGE_RECIPE_RESET_ENTRIES: null,
  SET_MANAGE_RECIPE_STATUS: null,
});
