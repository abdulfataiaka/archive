import models from '../database/models';

const {
  Recipe,
  User,
  Favorite,
} = models;

/**
 *
 *
 * @class Favorites
 */
class Favorites {
  /**
   * @description Adds a recipe as favorite for user
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof Favorites
   */
  static addRecipeAsFavorite(req, res) {
    const { userId } = req.userPayload;
    const { recipeId } = req.body;
    Recipe.findOne({ where: { id: recipeId } })
      // check if recipe exists in database
      .then((recipe) => {
        if (!recipe) {
          res.status(404).json({
            error: 'recipe to be added as favorite does not exist',
          });
        } else {
          Favorite.findOne({ where: { userId, recipeId } })
            .then((entry) => {
              //  check if recipe has already been added as favprites
              if (entry) {
                res.status(403).json({
                  error: 'recipe has already been added as favorite',
                });
              } else {
                // Add the recipe as favorite for user
                Favorite.create({ userId, recipeId })
                  .then((favorite) => {
                    res.status(200).json({
                      id: favorite.id,
                      message: 'recipe successfully added as favorite',
                      recipeId,
                    });
                  })
                  .catch(() => {
                    res.status(500).json({
                      error: 'an error occured while adding recipe as favorite',
                    });
                  });
              }
            })
            .catch(() => {
              res.status(500).json({
                error: 'error while adding recipe as favorite',
              });
            });
        }
      })
      .catch(() => {
        res.status(500).json({
          error: 'an error occured while adding recipe as favorite',
        });
      });
  }

  /**
   * @description Removes a recipe from user favorites
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof Favorites
   */
  static deleteFavoriteRecipe(req, res) {
    const { userId } = req.userPayload;
    const { recipeId } = req.body;
    // checking if recipe exists
    Recipe.findOne({ where: { id: recipeId } })
      .then((recipe) => {
        if (!recipe) {
          res.status(404).json({
            error: 'recipe to be deleted from favorites does not exist',
          });
        } else {
          // Checking if user already have recipe as favorite
          Favorite.findOne({ where: { userId, recipeId } })
            .then((entry) => {
              if (!entry) {
                res.status(403).json({
                  error: 'user haven\'t added this recipe as favorite',
                });
              } else {
                // Delete the favorite recipe
                entry.destroy()
                  .then(() => {
                    res.status(200).json({
                      message: 'favorite recipe deleted',
                      recipeId,
                    });
                  })
                  .catch(() => {
                    res.status(500).json({
                      error: 'error occured while deleting favorite recipes',
                    });
                  });
              }
            })
            .catch(() => {
              res.status(500).json({
                error: 'error occured while deleting favorite recipe',
              });
            });
        }
      })
      .catch(() => {
        res.status(500).json({
          errro: 'error occured while deleting favorite recipe',
        });
      });
  }

  /**
   * @description Gets the favorite recipes of a user
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof Favorites
   */
  static getFavoriteRecipes(req, res) {
    const { userId } = req.params;
    const ownerQuery = {
      model: Recipe,
      as: 'Recipe',
      include: [{
        model: User,
        as: 'Owner',
        attributes: ['username', 'name', 'avatar', 'email'],
      }],
    };

    Favorite.findAll({
      where: { userId },
      include: [ownerQuery],
    })
      .then((recipes) => {
        res.status(200).json({
          message: 'favorite recipes fetched successfully',
          recipes,
        });
      })
      .catch(() => {
        res.status(500).json({
          error: 'Error occured while fetching favorite recipes',
        });
      });
  }

  /**
   * @description Gets an array of user favorite IDs
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof Favorites
   */
  static getFavoriteRecipesIds(req, res) {
    const { userId } = req.params;
    Favorite.findAll({
      where: { userId },
    })
      .then((recipes) => {
        const recipeIds = [];
        recipes.map(item => recipeIds.push(item.recipeId));
        res.status(200).json({
          message: 'favorite recipes fetched successfully',
          recipeIds,
        });
      })
      .catch(() => {
        res.status(500).json({
          error: 'Error occured while fetching favorite recipes',
        });
      });
  }
}

export default Favorites;
