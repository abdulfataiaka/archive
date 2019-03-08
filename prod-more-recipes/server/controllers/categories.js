import models from '../database/models';

const {
  Category,
  Favorite,
} = models;

/**
 *
 *
 * @class Categories
 */
class Categories {
  /**
   * @description Adds new category for user
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof Categories
   */
  static addCategory(req, res) {
    const { userId } = req.userPayload;
    const { name } = req.body;
    if (typeof name !== 'string' || name.trim().length <= 0) {
      res.status(400).json({
        error: 'Provide a valid name for category',
      });
    } else {
      Category.findAll({
        where: {
          userId,
          name: {
            $ilike: `${name}`,
          },
        },
      })
        .then((categories) => {
          if (categories && categories.length > 0) {
            return res.status(409).json({
              error: 'Category with provided name exists',
            });
          }
          return Category.create({
            userId,
            name,
          })
            .then(category => res.status(201).json({
              message: 'Category added successfully',
              category,
            }))
            .catch(() => res.status(500).json({
              error: 'Error occured while adding catgory',
            }));
        })
        .catch(() => res.status(500).json({
          error: 'Error occured while adding catgory',
        }));
    }
  }

  /**
   * @description Deletes user category
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof Categories
   */
  static deleteCategory(req, res) {
    const { categoryId } = req.params;
    const { userId } = req.userPayload;
    Category.findOne({
      where: {
        id: categoryId,
        userId,
      },
    })
      .then((category) => {
        if (category) {
          category.destroy();
          return res.status(200).json({
            message: 'Category delete successfully',
          });
        }
        return res.status(404).json({
          error: 'Category does not exist',
        });
      })
      .catch(() => res.status(500).json({
        error: 'Error occured during catagory delete',
      }));
  }

  /**
   * @description Gets all user categories
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof Categories
   */
  static getCategories(req, res) {
    const { id: userId } = req.userPayload;
    Category.findAll({
      where: {
        userId,
      },
    })
      .then((categories) => {
        res.status(200).json({
          message: 'User categories fetch successfully',
          categories: [...categories].reverse(),
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: 'Error occured while fetching user categories',
          err,
        });
      });
  }

  /**
   * @description Adds a favorite recipe to category
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof Categories
   */
  static addToCategory(req, res) {
    const { userId } = req.userPayload;
    const { favoriteId, categoryId } = req.body;
    Favorite.findOne({
      where: {
        id: favoriteId,
        userId,
      },
    })
      .then((favorite) => {
        if (favorite) {
          favorite.set('categoryId', categoryId);
          favorite.save();
          return res.status(200).json({
            message: 'Favorite added to category',
          });
        }
        return res.status(404).json({
          error: 'Favorite does not exist',
        });
      })
      .catch(() => res.status(500).json({
        error: 'Could not add favorite to category',
      }));
  }

  /**
   * @description Removes a favorite recipe from category
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof Categories
   */
  static removeFromCategory(req, res) {
    const { userId } = req.userPayload;
    const { favoriteId } = req.body;
    Favorite.findOne({
      where: {
        id: favoriteId,
        userId,
      },
    })
      .then((favorite) => {
        if (favorite) {
          favorite.set('categoryId', null);
          favorite.save();
          return res.status(200).json({
            message: 'Favorite removed from category',
          });
        }
        return res.status(404).json({
          error: 'Favorite does not exist',
        });
      })
      .catch(() => res.status(500).json({
        error: 'Could not remove favorite from category',
      }));
  }
}

export default Categories;
