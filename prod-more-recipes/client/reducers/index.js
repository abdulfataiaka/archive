import { combineReducers } from 'redux';

import auth from './auth';
import popular from './popular';
import favorites from './favorites';
import toaster from './toaster';
import modal from './modal';
import catalog from './catalog';

// Dashboard reducers
import profile from './dashboard/profile';
import userRecipes from './dashboard/userRecipes';
import userFavorites from './dashboard/userFavorites';
import dashboard from './dashboard';
import categories from './dashboard/categories';
import manageRecipe from './dashboard/manageRecipe';

// Recipe viewpage reducer
import recipe from './recipe';

// Loader toast
import loader from './loader';

export default combineReducers({
  auth,
  dashboard,
  manageRecipe,
  popular,
  favorites,
  toaster,
  categories,
  loader,
  profile,
  catalog,
  recipe,
  modal,
  userRecipes,
  userFavorites,
});
