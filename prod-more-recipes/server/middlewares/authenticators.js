import jwt from 'jsonwebtoken';
import models from '../database/models';

const { User } = models;

/**
 * @description Verifies if recieved token is valid
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
const verifyUserToken = (req, res, next) => {
  const token = req.headers['x-user-token'];
  if (token) {
    jwt.verify(
      token, process.env.SECRET_KEY,
      (err, payload) => {
        if (
          !err && payload instanceof Object
          && 'userId' in payload
          && 'username' in payload
        ) {
          req.userPayload = {
            userId: payload.userId,
            username: payload.username,
          };
          next();
        } else {
          res.status(401).json({
            error: 'Invalid token provided',
          });
        }
      },
    );
  } else {
    res.status(401).json({
      error: 'No token supplied',
    });
  }
};

/**
 * @description Verifies if payload extracted from recieved token is valid
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
const verifyAuthUser = (req, res, next) => {
  const { userId, username } = req.userPayload;
  User.findOne({
    where: {
      id: userId,
      username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error: 'User does not exist',
        });
      }
      req.userPayload.avatar = user.avatar;
      return next();
    })
    .catch(() => {
      res.status(500).json({
        error: 'Error occured while verifying user',
      });
    });
};

/**
 * @description Verifies if user exist on the platform
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
const verifyUserId = (req, res, next) => {
  const { userId } = req.params;
  User.findOne({
    where: {
      id: userId,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error: 'User does not exist',
        });
      }
      req.userPayload = user;
      return next();
    })
    .catch(() => res.status(500).json({
      error: 'Error occured while verifying user',
    }));
};

/**
 * @description Checks if username has already been taken
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
const validateUsername = (req, res, next) => {
  const { username } = req.parsedSignUpData;
  User.findOne({
    where: {
      username: {
        $ilike: `%${username}%`,
      },
    },
  })
    .then((user) => {
      if (user) {
        return res.status(409).json({
          error: 'Username is already taken',
        });
      }
      return next();
    })
    .catch(() => res.status(500).json({
      error: 'Error occured while validating username',
    }));
};

export default {
  verifyUserToken,
  verifyAuthUser,
  validateUsername,
  verifyUserId,
};
