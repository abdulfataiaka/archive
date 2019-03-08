import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import models from '../database/models';

const { User } = models;

/**
 * @description A collection of controllers for handling user actions
 *
 * @class Users
 */
class Users {
  /**
   * @description Verify if current client is authentic
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @returns
   * @memberof Users
   */
  static verifyClientUser(req, res) {
    const { userId, username } = req.userPayload;
    const {
      userId: clientUserId,
      username: clientUsername,
    } = req.body;
    if (
      `${userId}` === `${clientUserId}`
      && `${username}` === `${clientUsername}`
    ) {
      return res.status(200).json({
        message: 'User successfully verified',
        verificationStatus: true,
      });
    }
    return res.status(500).json({
      error: 'User verification failed',
      verificationStatus: false,
    });
  }

  /**
   * @description Registers a new user onto the app and generates token
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof Users
   */
  static signUp(req, res) {
    const info = req.parsedSignUpData;
    User.create(info)
      .then((user) => {
        const payload = {
          userId: user.id,
          username: user.username,
          avatar: user.avatar,
        };
        //  Generating a token
        const token = jwt.sign(
          payload,
          process.env.SECRET_KEY,
          { expiresIn: 60 * 60 * 24 },
        );
        return res.status(201).json({
          message: 'Signup was successful',
          user: {
            userId: user.id,
            username: user.username,
            avatar: user.avatar,
            name: user.name,
            email: user.email,
          },
          token,
        });
      })
      .catch(() => res.status(500).json({
        error: 'Server error occured during signup',
      }));
  }

  /**
   * @description Gets a user details
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof Users
   */
  static getUser(req, res) {
    const { userId } = req.params;
    User.findById(userId, {
      attributes: {
        exclude: ['password'],
      },
    })
      .then((user) => {
        if (user) {
          return res.status(200).json({
            message: 'User details fetched successfully',
            user,
          });
        }
        return res.status(404).json({
          error: 'User does not exists',
        });
      })
      .catch(() => res.status(500).json({
        error: 'Unable to get user details',
      }));
  }

  /**
   * @description Signs in a user onto the app and generates token
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @returns
   * @memberof Users
   */
  static signIn(req, res) {
    //  extract parsed data
    const payload = req.userPayload;
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 24 });
    return res.status(200).json({
      message: 'Signin was successful',
      user: {
        userId: payload.userId,
        username: payload.username,
        avatar: payload.avatar,
      },
      token,
    });
  }

  /**
   * @description Changes the password of a user
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof Users
   */
  static changePassword(req, res) {
    const { userId } = req.userPayload;
    const { currentPassword, newPassword } = req.body;
    // checks if current password provided is empty
    if (
      typeof currentPassword !== 'string'
      || currentPassword.length <= 0
    ) {
      res.status(400).json({
        error: 'Provide your current password',
      });
    } else if (
      // checks if new password provided is empty
      typeof newPassword !== 'string'
      || newPassword.length <= 0
    ) {
      res.status(400).json({
        error: 'New password field is required',
      });
      // checks if new password provided is of acceptable length
    } else if (newPassword.length < 5 || newPassword.length > 25) {
      res.status(400).json({
        error: 'New password should range between 5 - 25 characters',
      });
    } else {
      // checks if user exist on platform
      User.findById(userId)
        .then((user) => {
          if (!user) {
            res.status(404).json({
              error: 'User could not be found',
            });
          } else {
            // Confirm current password for user
            bcrypt.compare(currentPassword, user.password, (err, status) => {
              if (!status) {
                return res.status(400).json({
                  error: 'Current password provided is incorrect',
                });
              }
              // Encrypt the new password
              bcrypt.hash(newPassword, 8, (hashErr, hash) => {
                if (hashErr) {
                  return res.status(500).json({
                    error: 'Error occured while encrypting new password',
                  });
                }
                // Update user password
                user.set('password', hash);
                user.save();
                return res.status(200).json({
                  message: 'Password changed successfully',
                });
              });
            });
          }
        })
        .catch(() => res.status(500).json({
          error: 'Erroroccured while encrypting new password',
        }));
    }
  }

  /**
   * @description Updates user personal details
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof Users
   */
  static updatePersonal(req, res) {
    const {
      userPayload,
      userDetails,
    } = req;
    const { userId, username } = userPayload;
    User.findOne({
      where: {
        id: userId,
        username,
      },
    })
      .then((user) => {
        if (user) {
          user.update(userDetails)
            .then((newUser) => {
              res.status(200).json({
                message: 'User details updated successfully',
                user: {
                  id: newUser.id,
                  name: newUser.name,
                  email: newUser.email,
                  gender: newUser.gender,
                },
              });
            })
            .catch(() => {
              res.status(500).json({
                error: 'Unable to update user details',
              });
            });
        }
      })
      .catch(() => {
        res.status(500).json({
          error: 'Unable to update user details',
        });
      });
  }
}

export default Users;
