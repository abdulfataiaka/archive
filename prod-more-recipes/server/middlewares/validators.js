import ValidatorJS from 'validatorjs';
import bcrypt from 'bcrypt';
import models from '../database/models';

const { User, Recipe } = models;

/**
 * @description Extracts errors from the return of validatorJs
 *
 * @param {any} info
 * @param {any} rules
 * @returns
 */
const extractErrors = (info, rules) => {
  const validate = new ValidatorJS(info, rules);
  if (!validate.passes()) {
    const errors = [];
    Object.entries(rules).forEach((item) => {
      const [key] = item;
      const err = validate.errors.first(key);
      if (typeof err === 'string' && err.length > 0) errors.push(err);
    });
    return errors.length === 0 ? ['unrecognised error occured'] : errors;
  }
  return true;
};

const trimAndNullify = item => (typeof item === 'string' ? item.trim() : null);

/**
 * @description Validates signup form data
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns
 */
const validateSignUp = (req, res, next) => {
  const info = req.body;

  // Prevent the escape of undefined type
  info.name = trimAndNullify(info.name);
  info.username = trimAndNullify(info.username);
  info.email = trimAndNullify(info.email);

  const rules = {
    name: 'required|string',
    email: 'email',
    username: 'required|min:5|max:25',
    password: 'required|min:5|max:25',
  };

  const noErrors = extractErrors(info, rules);
  if (noErrors === true) {
    //  checking if username starts with a number
    if (!Number.isNaN(parseInt(info.username[0], 10))) {
      res.status(400).json({
        error: 'Username cannot start with a number',
      });
    } else {
      bcrypt.hash(info.password, 8, (err, hash) => {
        if (!err) {
          // setting parsed, validated and real data for signup
          // via request to the controller
          req.parsedSignUpData = {
            name: info.name,
            email: info.email,
            username: info.username,
            password: hash,
          };
          return next();
        }
        return res.status(500).json({
          error: 'Password encryption error during signup',
        });
      });
    }
  } else {
    res.status(400).json({
      error: noErrors[0],
    });
  }
};

/**
 * @description Validates signIn form data
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns
 */
const validateSignIn = (req, res, next) => {
  const info = req.body;
  const rules = {
    username: 'required',
    password: 'required',
  };
  info.username = trimAndNullify(info.username);
  const errors = extractErrors(info, rules);
  if (errors === true) {
    User.findOne({ where: { username: info.username } })
      .then((user) => {
        if (user) {
          bcrypt.compare(info.password, user.password, (err, status) => {
            if (status) {
              req.userPayload = {
                userId: user.id,
                username: user.username,
                avatar: user.avatar,
              };
              next();
            } else {
              res.status(401).json({
                error: `Incorrect password for user ${info.username}`,
              });
            }
          });
        } else {
          res.status(401).json({
            error: 'No account found with the username provided',
          });
        }
      })
      .catch(() => res.status(500).json({
        error: 'unknown error occured during signin',
      }));
  } else {
    res.status(400).json({
      error: errors[0],
    });
  }
};

/**
 * @description Validates edit recipe form data
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
const validateEditRecipe = (req, res, next) => {
  const { userId } = req.userPayload;
  const { recipeId } = req.params;
  Recipe.findOne({ where: { id: recipeId, userId } })
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).json({
          message: 'No such recipe of your was not found',
        });
      }
      return next();
    })
    .catch(() => {});
};

/**
* @description Validates new recipe form data
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
const validateRecipeData = (req, res, next) => {
  const {
    title,
    ingredients,
    procedure,
    uploadImage,
  } = req.body;
  const { file } = req;
  const rules = {
    title: 'required',
    ingredients: 'required',
    procedure: 'required',
  };
  const parsedRecipeData = {
    title,
    ingredients,
    procedure,
  };
  const errors = extractErrors(parsedRecipeData, rules);
  if (errors === true) {
    req.body.uploadImage = `${uploadImage}` === '1';
    // Check if to upload image and validate type and size;
    if (
      req.body.uploadImage && (
        !file
        ||
        file.size > 500000
        || !file.buffer
        || ![
          'image/jpeg',
          'image/jpg',
          'image/png',
        ].includes(file.mimetype)
      )
    ) {
      res.status(400).json({
        error: 'Image should be of type png, jpg or jpeg and maxsize 500 KB',
      });
    } else {
      req.parsedRecipeData = parsedRecipeData;
      next();
    }
  } else {
    res.status(400).json({
      error: errors[0],
    });
  }
};

/**
 * @description Validate review posting formdata
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns
 */
const validateReviewData = (req, res, next) => {
  const info = req.body;
  const rules = {
    comment: 'required|min:1',
  };
  const errors = extractErrors(info, rules);
  if (errors === true) {
    req.parsedReviewData = {
      comment: info.comment,
    };
    return next();
  }
  return res.status(400).json({
    error: errors[0],
  });
};

/**
 * @description Validate update user personal details formdata
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns
 */
const validateUpdatePersonal = (req, res, next) => {
  let { name, email, gender } = req.body;
  name = trimAndNullify(name);
  email = trimAndNullify(email);
  gender = (gender === null || gender === undefined) ? '' : gender;
  const rules = {
    name: 'required|string',
    email: 'email',
    gender: 'string',
  };
  const noErrors = extractErrors({
    name,
    email,
    gender,
  }, rules);
  if (noErrors === true) {
    if (
      gender.trim().length > 0
      && !(['male', 'female', 'others'].includes(gender.trim().toLowerCase()))
    ) {
      return res.status(400).json({
        error: 'Invalid gender provided',
      });
    }
    if (gender.trim().length <= 0) {
      gender = null;
    } else {
      gender = gender.trim();
    }
    if (typeof email !== 'string' || email.length <= 0) {
      email = null;
    }
    req.userDetails = {
      name,
      email,
      gender,
    };
    return next();
  }
  return res.status(400).json({
    error: noErrors[0],
  });
};

const validators = {
  validateSignUp,
  validateSignIn,
  validateEditRecipe,
  validateRecipeData,
  validateUpdatePersonal,
  validateReviewData,
};

export default validators;
