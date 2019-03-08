import controllers from '../controllers';
import middlewares from '../middlewares';

const { authenticators, validators } = middlewares;

const {
  Users,
  Recipes,
  Categories,
  Favorites,
} = controllers;

export default (router) => {
  router.post(
    '/users/signup',
    validators.validateSignUp,
    authenticators.validateUsername,
    Users.signUp,
  );

  router.post(
    '/users/signin',
    validators.validateSignIn,
    Users.signIn,
  );

  //  Adding recipe as favorite
  router.get('/users/:userId/favorites/ids', Favorites.getFavoriteRecipesIds);

  //  A route to a user details
  router.get('/users/:userId', Users.getUser);

  router.post(
    '/users/client/verify',
    authenticators.verifyUserToken,
    authenticators.verifyAuthUser,
    Users.verifyClientUser,
  );

  //  A route to update user information
  router.put(
    '/users/personal',
    authenticators.verifyUserToken,
    authenticators.verifyAuthUser,
    validators.validateUpdatePersonal,
    Users.updatePersonal,
  );

  //  A route to update user password
  router.put(
    '/users/password',
    authenticators.verifyUserToken,
    authenticators.verifyAuthUser,
    Users.changePassword,
  );

  //  Adding recipe as favorite
  router.get(
    '/users/:userId/favorites',
    Favorites.getFavoriteRecipes,
  );

  //  A route to add a recipe as favorite
  //  by an authenticated user
  router.post(
    '/users/favorites',
    authenticators.verifyUserToken,
    authenticators.verifyAuthUser,
    Favorites.addRecipeAsFavorite,
  );

  //  A route to remove a favorite recipe by an
  //  authenticated user
  router.delete(
    '/users/favorites',
    authenticators.verifyUserToken,
    authenticators.verifyAuthUser,
    Favorites.deleteFavoriteRecipe,
  );

  //  A route to get all user's categories
  router.get(
    '/users/:userId/categories',
    authenticators.verifyUserId,
    Categories.getCategories,
  );

  //  A route to get all user's categories
  router.get(
    '/users/:userId/recipes',
    authenticators.verifyUserId,
    Recipes.getUserRecipes,
  );
};

