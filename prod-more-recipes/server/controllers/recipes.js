import models from '../database/models';

const {
  Recipe,
  Vote,
  Favorite,
  User,
  Review,
} = models;

/**
 * @description A collection of all recipes controllers
 *
 * @class Recipes
 */
class Recipes {
  /**
  * @description Checks if request is for getting popular recipes
  *
  * @static
  * @param {any} req
  * @returns
  * @memberof Recipes
  */
  static isPopularRecipesRequest(req) {
    // sort=upvotes&order=desc
    return req.query.sort === 'upvotes';
  }

  /**
   * @description Gets all recipes on the platform with pagination
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof Recipes
   */
  static getAllRecipes(req, res) {
    let { page, count, query } = req.query;

    query = typeof query === 'string' ? query.trim() : null;

    count = parseInt(count, 10);
    count = !Number.isInteger(count) ? 8 : count;

    page = parseInt(page, 10);
    page = !Number.isInteger(page) ? 1 : page;

    const options = {
      distinct: true,
      limit: count,
      order: [['id', 'DESC']],
      offset: count * (page - 1),
      include: [{
        model: User,
        attributes: ['username', 'name', 'avatar', 'email'],
        as: 'Owner',
      }],
    };

    if (query !== null) {
      options.where = {
        $or: [
          {
            title: {
              $ilike: `%${query}%`,
            },
          },
          {
            ingredients: {
              $ilike: `%${query}%`,
            },
          },
        ],
      };
    }

    Recipe.findAndCountAll(options)
      .then((recipes) => {
        const totalCount = recipes.count;
        const pageSize = recipes.rows.length;
        const pageCount = Math.ceil(totalCount / count);
        const pagination = {
          page, totalCount, pageCount, pageSize, pageLimit: count,
        };
        //  send back response
        res.status(200).json({
          message: 'Recipes fetched successfully',
          pagination,
          recipes: recipes.rows,
        });
      })
      .catch(() => res.status(500).json({
        error: 'Unexpected error occured',
      }));
  }

  /**
   * @description Gets popular recipes
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof Recipes
   */
  static getPopularRecipes(req, res) {
    let { count, order } = req.query;
    if (order !== 'desc' && order !== 'asc') {
      order = 'desc';
    }
    count = parseInt(count, 10);
    if (!Number.isInteger(count)) {
      // default to be fetched
      count = 6;
    }
    Recipe.all({
      limit: count,
      order: [['upvotes', order]],
      include: [{
        model: User,
        attributes: ['username', 'name', 'avatar', 'email'],
        as: 'Owner',
      }],
    })
      .then((recipes) => {
        res.status(200).json({
          message: 'Popular recipes fetched successfully',
          recipes,
        });
      })
      .catch(() => {
        res.status(500).json({
          error: 'Could not fetch popular recipes',
        });
      });
  }


  /**
   * @description Gets all recipes added by a user
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof Recipes
   */
  static getUserRecipes(req, res) {
    let { userId } = req.params;
    let { page, count } = req.query;

    userId = parseInt(userId, 10);
    userId = Number.isInteger(userId) ? userId : null;

    count = parseInt(count, 10);
    count = !Number.isInteger(count) ? 8 : count;

    page = parseInt(page, 10);
    page = !Number.isInteger(page) ? 1 : page;

    const options = {
      distinct: true,
      where: { userId },
      limit: count,
      order: [['id', 'DESC']],
      offset: count * (page - 1),
      include: [{
        model: User,
        attributes: ['username', 'name', 'avatar', 'email'],
        as: 'Owner',
      }],
    };

    if (userId === null) {
      res.status(400).json({
        error: 'Invalid user id provided',
      });
    } else {
      Recipe.findAndCountAll(options)
        .then((recipes) => {
          const totalCount = recipes.count;
          const pageSize = recipes.rows.length;
          const pageCount = Math.ceil(totalCount / count);
          const pagination = {
            page, totalCount, pageCount, pageSize, pageLimit: count,
          };
          //  send back response
          res.status(200).json({
            message: 'User recipes fetched successfully',
            pagination,
            recipes: recipes.rows,
          });
        })
        .catch(() => res.status(500).json({
          error: 'Could not fetch user recipes',
        }));
    }
  }

  /**
   * @description Creates a new recipe
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof Recipes
   */
  static addRecipe(req, res) {
    const info = req.parsedRecipeData;
    const { userId } = req.userPayload;
    const { upload } = req;
    if (upload && upload.status) {
      const { url } = upload;
      const newRecipe = {
        ...info,
        upvotes: 0,
        downvotes: 0,
        noviews: 0,
        image: url,
        userId,
      };
      // Add the recipe to the recipes table
      Recipe.create(newRecipe)
        .then((recipe) => {
          res.status(201).json({
            message: 'recipe added successfully',
            recipe,
          });
        })
        .catch(() => {
          res.status(500).json({
            error: 'Error occured while adding recipe',
          });
        });
    } else {
      res.status(400).json({
        error: 'Image should be of type png, jpg or jpeg and maxsize 500 KB',
      });
    }
  }

  /**
   * @description Updates a recipe
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof Recipes
   */
  static editRecipe(req, res) {
    const info = req.parsedRecipeData;
    const { userId } = req.userPayload;
    const { recipeId } = req.params;
    const { upload } = req;

    let newDetails = { ...info };
    if (upload && upload.status) {
      const { url } = upload;
      newDetails = {
        ...newDetails,
        image: url,
      };
    } else if (upload !== null) {
      res.status(500).json({
        error: 'Error occured while updating recipe',
      });
    }
    //  Now update recipe in database
    Recipe.findOne({
      where: {
        userId,
        id: recipeId,
      },
    })
      .then((recipe) => {
        if (!recipe) {
          res.status(500).json({
            error: 'Unable to update recipe',
          });
        } else {
          recipe.update(newDetails)
            .then((newRecipe) => {
              res.status(200).json({
                message: 'Recipe updated successfully',
                recipe: newRecipe,
              });
            })
            .catch(() => {
              res.status(500).json({
                error: 'Unable to update recipe',
              });
            });
        }
      })
      .catch(() => res.status(500).json({
        error: 'Unable to update recipe',
      }));
  }

  /**
   * @description Gets user current vote on recipe
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof Recipes
   */
  static getVoteForRecipe(req, res) {
    const { userId } = req.userPayload;
    let { recipeId } = req.params;
    recipeId = Number.isInteger(parseInt(recipeId, 10))
      ? parseInt(recipeId, 10)
      : null;
    Vote.findOne({
      where: {
        userId,
        recipeId,
      },
      attributes: ['userId', 'recipeId', 'vote'],
    })
      .then((entry) => {
        let vote = entry;
        if (!vote) {
          vote = {
            userId,
            recipeId,
            vote: 0,
          };
        }
        return res.status(200).json({
          message: 'Vote for recipe fetched',
          vote,
        });
      })
      .catch(() => res.status(500).json({
        error: 'Could not get user vote on recipe',
      }));
  }

  /**
   * @description Upvotes a recipe
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof Recipes
   */
  static upVoteRecipe(req, res) {
    const { recipeId } = req.params;
    const { userId } = req.userPayload;
    Recipe.findById(recipeId)
      .then((recipe) => {
        if (!recipe) {
          res.status(404).json({
            error: 'recipe could not be found',
          });
        } else {
          //  checking if upvoting user have voted this recipe before
          Vote.findOne({ where: { userId, recipeId } })
            .then((entry) => {
              // existing upvoter
              // user must have either upvoted or downvoted before
              if (entry) {
                const { vote } = entry;
                if (vote === 2) {
                  entry.set('vote', 0);
                  entry.save();
                  recipe.decrement('upvotes');
                  res.status(200).json({
                    message: 'Upvote for recipe removed',
                  });
                } else if (vote === 0) {
                  entry.set('vote', 2);
                  entry.save();
                  recipe.increment('upvotes');
                  res.status(200).json({
                    message: 'Recipe upvoted successfully',
                    recipeId,
                  });
                } else {
                  entry.set('vote', 2);
                  entry.save();
                  recipe.increment('upvotes');
                  recipe.decrement('downvotes');
                  res.status(200).json({
                    message: 'Recipe upvoted successfully',
                    recipeId,
                  });
                }
              } else {
                Vote.create({ userId, recipeId, vote: 2 })
                  .then(() => {
                  //  Try incrementing number of upvotes
                    recipe.increment('upvotes');
                    res.status(200).json({
                      message: 'Recipe upvoted successfully',
                      recipeId,
                    });
                  })
                  .catch(() => res.status(500).json({
                    error: 'Error occured while upvoting recipe',
                  }));
              }
            })
            .catch(() => res.status(500).json({
              error: 'Error occured while upvoting recipe',
            }));
        }
      })
      .catch(() => res.status(500).json({
        error: 'Error occured while upvoting recipe',
      }));
  }

  /**
   * @description Downvote a recipe
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof Recipes
   */
  static downVoteRecipe(req, res) {
    const { recipeId } = req.params;
    const { userId } = req.userPayload;

    Recipe.findById(recipeId)
      .then((recipe) => {
        if (!recipe) {
          res.status(404).json({
            message: 'Recipe could not be found',
          });
        } else {
          //  checking if downvoting user have voted this recipe before
          Vote.findOne({ where: { userId, recipeId } })
            .then((entry) => {
              // existing downvoter
              if (entry) {
                const { vote } = entry;
                if (vote === 1) {
                  entry.set('vote', 0);
                  entry.save();
                  recipe.decrement('downvotes');
                  res.status(200).json({
                    message: 'Downvote for recipe removed',
                  });
                } else if (vote === 0) {
                  entry.set('vote', 1);
                  entry.save();
                  recipe.increment('downvotes');
                  res.status(200).json({
                    message: 'Recipe downvoted successfully',
                    recipeId,
                  });
                } else {
                  entry.set('vote', 1);
                  entry.save();
                  recipe.increment('downvotes');
                  recipe.decrement('upvotes');
                  res.status(200).json({
                    message: 'Recipe downvoted successfully',
                    recipeId,
                  });
                }
              } else {
                Vote.create({ userId, recipeId, vote: 1 })
                  .then(() => {
                    //  Try incrementing number of upvotes
                    recipe.increment('downvotes');
                    res.status(200).json({
                      message: 'recipe downvoted successfully',
                      recipeId,
                    });
                  })
                  .catch(() => res.status(500).json({
                    error: 'Error occured while downvoting recipe',
                  }));
              }
            })
            .catch(() => res.status(500).json({
              error: 'error occured while downvoting recipe',
            }));
        }
      })
      .catch(() => res.status(500).json({
        error: 'error occured while downvoting recipe',
      }));
  }

  /**
   * @description Gets a recipe details
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof Recipes
   */
  static getRecipe(req, res) {
    const { recipeId } = req.params;
    Recipe.findById(recipeId, {
      include: [{
        model: User,
        attributes: [
          'username',
          'name',
          'email',
          'avatar',
          'updatedAt',
        ],
        as: 'Owner',
      },
      {
        model: Review,
        //  This alias must be the same as
        //  that defined from association
        as: 'Reviews',
        attributes: ['comment'],
        include: [{
          model: User,
          as: 'User',
          attributes: [
            'id',
            'username',
            'avatar',
            'createdAt',
          ],
        }],

      }],
    })
      .then((recipe) => {
        if (recipe) {
          res.status(200).json({
            message: 'Recipe fetch succesfully',
            recipe,
          });
        } else {
          res.status(404).json({
            error: 'Recipe does not exist',
          });
        }
      })
      .catch(() => {
        res.status(500).json({
          error: 'Error occured while getting recipe',
        });
      });
  }

  /**
   * @description Deletes a user recipe
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof Recipes
   */
  static deleteRecipe(req, res) {
    const { recipeId } = req.params;
    const { userId } = req.userPayload;
    Recipe.findOne({ where: { id: recipeId } })
      .then((recipe) => {
        if (recipe) {
          //  check if user own the recipe
          if (recipe.userId !== userId) {
            res.status(403).json({
              error: 'You cannot delete recipes created by other users',
            });
          } else {
            // then you can now delete recipe
            recipe.destroy()
              .then(() => {
                Favorite.destroy({
                  where: {
                    recipeId,
                  },
                });
                res.status(200).json({
                  message: 'recipe deleted successfully',
                  recipeId,
                });
              })
              .catch(() => res.status(500).json({
                error: 'error occured while deleting recipe',
              }));
          }
        } else {
          res.status(404).json({
            error: 'recipe could not be found',
          });
        }
      })
      .catch(() => res.status(500).json({
        error: 'error occured while deleting recipe',
      }));
  }

  /**
   * @description Posts review for recipe
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof Recipes
   */
  static postReview(req, res) {
    const { recipeId } = req.params;
    const { userId, username, avatar } = req.userPayload;
    const info = req.parsedReviewData;
    info.userId = userId;
    info.recipeId = recipeId;
    Recipe.findById(recipeId)
      .then((recipe) => {
        if (!recipe) {
          res.status(404).json({
            error: 'Recipe could not be found',
          });
        } else {
          //  Now post review on recipe
          Review.create(info)
            .then(review => res.status(201).json({
              message: 'Review posted successfully',
              review: {
                comment: review.comment,
                User: {
                  id: userId,
                  avatar,
                  username,
                  createdAt: review.createdAt,
                },
              },
            }))
            .catch(() => res.status(500).json({
              error: 'Error occured while posting review',
            }));
        }
      })
      .catch(() => res.status(500).json({
        error: 'Error occured while posting review',
      }));
  }
}


export default Recipes;
