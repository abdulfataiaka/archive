// include all controllers needed for routes in this file
import controllers from '../controllers';
import middlewares from '../middlewares';

//  include all middlewares required for this module
const { authenticators } = middlewares;

// extracting all controllers needed for this module
const {
  Categories,
} = controllers;

//  start creating recipe routes
export default (router) => {
  router.delete(
    '/categories/:categoryId',
    authenticators.verifyUserToken,
    authenticators.verifyAuthUser,
    Categories.deleteCategory,
  );
  router.post(
    '/categories',
    authenticators.verifyUserToken,
    authenticators.verifyAuthUser,
    Categories.addCategory,
  );
  router.put(
    '/categories/remove',
    authenticators.verifyUserToken,
    authenticators.verifyAuthUser,
    Categories.removeFromCategory,
  );

  router.put(
    '/categories/add',
    authenticators.verifyUserToken,
    authenticators.verifyAuthUser,
    Categories.addToCategory,
  );
};

