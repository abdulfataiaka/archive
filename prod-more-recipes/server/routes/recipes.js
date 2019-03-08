import multer from 'multer';

import controllers from '../controllers';
import middlewares from '../middlewares';
import recipeImageUpload from '../middlewares/recipeImageUpload';

const { validators, authenticators } = middlewares;

const { Recipes } = controllers;

export default (router) => {
  router.get('/recipes', (req, res) => {
    //  >> sort=upvotes&order=desc
    if (Recipes.isPopularRecipesRequest(req)) {
      Recipes.getPopularRecipes(req, res);
    } else {
      Recipes.getAllRecipes(req, res);
    }
  });

  const multerExtractRecipeData = multer({
    storage: multer.memoryStorage(),
    preservePath: true,
    fileFilter: (req, file, cb) => {
      cb(null, true);
    },
  }).single('recipeImageFile');

  // A route for adding recipes to recipes table
  router.post(
    '/recipes',
    authenticators.verifyUserToken,
    authenticators.verifyAuthUser,
    multerExtractRecipeData,
    validators.validateRecipeData,
    recipeImageUpload,
    Recipes.addRecipe,
  );

  //  A route to edit a single recipe
  router.put(
    '/recipes/:recipeId',
    authenticators.verifyUserToken,
    authenticators.verifyAuthUser,
    multerExtractRecipeData,
    validators.validateEditRecipe,
    validators.validateRecipeData,
    recipeImageUpload,
    Recipes.editRecipe,
  );

  //  A route to get a single recipe
  router.get('/recipes/:recipeId', Recipes.getRecipe);

  //  A route to upvote a recipe
  router.put(
    '/recipes/:recipeId/upvote',
    authenticators.verifyUserToken,
    authenticators.verifyAuthUser,
    Recipes.upVoteRecipe,
  );

  //  A route to downvote a recipe
  router.put(
    '/recipes/:recipeId/downvote',
    authenticators.verifyUserToken,
    authenticators.verifyAuthUser,
    Recipes.downVoteRecipe,
  );

  //  A route to post a review for a recipe
  router.post(
    '/recipes/:recipeId/reviews',
    authenticators.verifyUserToken,
    authenticators.verifyAuthUser,
    validators.validateReviewData,
    Recipes.postReview,
  );

  //  A route to get user vote onrecipe
  router.get(
    '/recipes/:recipeId/vote',
    authenticators.verifyUserToken,
    authenticators.verifyAuthUser,
    Recipes.getVoteForRecipe,
  );

  //  A route to delete a single recipe
  router.delete(
    '/recipes/:recipeId',
    authenticators.verifyUserToken,
    authenticators.verifyAuthUser,
    Recipes.deleteRecipe,
  );
};
