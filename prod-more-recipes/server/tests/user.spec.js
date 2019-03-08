import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';

import app from '../app';
import models from '../database/models';

import factory from '../factory';

const should = chai.should();
chai.use(chaiHttp);

describe('Testing user authentication routes and middlewares', () => {
  beforeEach((done) => {
    models.User.destroy({
      where: {},
      truncate: true,
      cascade: true,
    }).then(() => { done(); }).catch(() => { done(); });
  });

  // SINGUP ENDPOINTS
  describe('Sign up endpoint', () => {
    describe('Users signup, where the user does not exists and credentials are ok', () => {
      it('it should return status code 201 and an object that includes a token', (done) => {
        const user = factory.create('newUser');
        request(app)
          .post('/api/v1/users/signup')
          .send(user)
          .expect(201)
          .end((err, res) => {
            if (err) return done(err);
            res.body.should.have.property('token');
            return done();
          });
      });
    });

    describe('Users signup, where the user does not exists and email not provided', () => {
      it('it should return status code 201 and an object that includes a token', (done) => {
        const user = factory.create('newUser', { email: '' });
        user.email.should.equal('');
        request(app)
          .post('/api/v1/users/signup')
          .send(user)
          .expect(201)
          .end((err, res) => {
            if (err) return done(err);
            res.body.should.have.property('token');
            return done();
          });
      });
    });

    describe('Users signup, where the user does not exists and username not provided', () => {
      it('it should return status code 400 and an object that includes an error', (done) => {
        const user = factory.create('newUser', { username: '' });
        user.username.should.equal('');
        request(app)
          .post('/api/v1/users/signup')
          .send(user)
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            res.body.should.have.property('error');
            return done();
          });
      });
    });

    describe('Users signup, where the user has already registered', () => {
      it('it should return status code 409 and an object that includes an error', (done) => {
        const user = factory.create('newUser');
        factory.signUp(app, request, done, user, () => {
          request(app)
            .post('/api/v1/users/signup')
            .send(user)
            .expect(409)
            .end((err, res) => {
              if (err) return done(err);
              res.body.should.have.property('error');
              res.body.error.toLowerCase().should.equal('username is already taken');
              return done();
            });
        });
      });
    });
  });

  // SINGIN ENDPOINTS
  describe('Sign in endpoint', () => {
    describe('Users signin, where the user exists', () => {
      it('it should return status code 200 and an object that includes token', (done) => {
        const user = factory.create('newUser');
        const authUser = factory.create('authUser');
        factory.signUp(app, request, done, user, () => {
          request(app)
            .post('/api/v1/users/signin')
            .send(authUser)
            .expect(200)
            .end((err, res) => {
              if (err) done(err);
              else {
                res.body.should.have.property('token');
                done();
              }
            });
        });
      });
    });

    describe('Users signin, where the user does not exists', () => {
      it('it should return status code 401 and an object that includes error', (done) => {
        const authUser = factory.create('authUser');
        request(app)
          .post('/api/v1/users/signin')
          .send(authUser)
          .expect(401)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              res.body.should.have.property('error');
              res.body.error.toLowerCase().should.equal('no account found with the username provided');
              done();
            }
          });
      });
    });

    describe('Users signin, where the user exists but with wrong password', () => {
      it('it should return status code 401 and an object that includes error', (done) => {
        const user = factory.create('newUser');
        const authUser = factory.create('authUser', { password: 'fakePassword' });
        factory.signUp(app, request, done, user, () => {
          request(app)
            .post('/api/v1/users/signin')
            .send(authUser)
            .expect(401)
            .end((err, res) => {
              if (err) {
                done(err);
              } else {
                res.body.should.have.property('error');
                res.body.error.toLowerCase().should
                  .equal(`incorrect password for user ${user.username}`);
                done();
              }
            });
        });
      });
    });

    describe('Users signin, with bad credentials', () => {
      it('it should return status code 400 and an object that includes error', (done) => {
        const authUser = factory.create('authUser', { username: '' });
        request(app)
          .post('/api/v1/users/signin')
          .send(authUser)
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            res.body.should.have.property('error');
            return done();
          });
      });
    });
  });

  // OTHER ENDPOINTS
  describe('User internal endpoints', () => {
    describe('Get user details', () => {
      it('it should return status code 200 and an object that includes a user', (done) => {
        const newUser = factory.create('newUser');
        factory.signUp(app, request, done, newUser, (token, user) => {
          const { userId } = user;
          request(app)
            .get(`/api/v1/users/${userId}`)
            .expect(200)
            .end((err, res) => {
              res.body.should.have.property('user');
              res.body.user.id.should.equal(user.userId);
              done();
            });
        });
      });
    });

    describe('Get user details for an invalid userId', () => {
      it('it should return status code 404 and an object that includes error attribute', (done) => {
        const fakeUserId = 13242;
        request(app)
          .get(`/api/v1/users/${fakeUserId}`)
          .expect(404)
          .end((err, res) => {
            res.body.should.have.property('error');
            done();
          });
      });
    });

    describe('Verify client user', () => {
      it('it should return status code 200 and an object that has attribute verificationStatus', (done) => {
        const newUser = factory.create('newUser');
        factory.signUp(app, request, done, newUser, (token, user) => {
          request(app)
            .post('/api/v1/users/client/verify')
            .set('x-user-token', token)
            .send({
              userId: user.userId,
              username: user.username,
            })
            .expect(200)
            .end((err, res) => {
              res.body.should.have.property('verificationStatus');
              res.body.verificationStatus.should.equal(true);
              done();
            });
        });
      });
    });

    describe('Verify client user with invalid token', () => {
      it(
        'it should return status code 200 with an object that includes verificationStatus attribute as false',
        (done) => {
          const user = factory.create('newUser');
          request(app)
            .post('/api/v1/users/client/verify')
            .set('x-user-token', null)
            .send({
              userId: 43424,
              username: user.username,
            })
            .expect(200)
            .end((err, res) => {
              res.body.should.have.property('error');
              done();
            });
        },
      );
    });

    describe('Verify client user with a non matching userId', () => {
      it(
        'it should return status code 200 with an object that includes verificationStatus attribute as false',
        (done) => {
          const newUser = factory.create('newUser');
          factory.signUp(app, request, done, newUser, (token, user) => {
            request(app)
              .post('/api/v1/users/client/verify')
              .set('x-user-token', token)
              .send({
                userId: 42442,
                username: user.username,
              })
              .expect(200)
              .end((err, res) => {
                res.body.should.have.property('verificationStatus');
                res.body.verificationStatus.should.equal(false);
                done();
              });
          });
        },
      );
    });

    describe('Verify client user with a non matching username', () => {
      it('it should return status code 200 and an object that has attribute verificationStatus', (done) => {
        const newUser = factory.create('newUser');
        factory.signUp(app, request, done, newUser, (token, user) => {
          request(app)
            .post('/api/v1/users/client/verify')
            .set('x-user-token', token)
            .send({
              userId: user.userId,
              username: 'fakeUsername',
            })
            .expect(200)
            .end((err, res) => {
              res.body.should.have.property('verificationStatus');
              res.body.verificationStatus.should.equal(false);
              done();
            });
        });
      });
    });


    describe('Update personal details', () => {
      it(
        'it should return status code 200 and an object that has attributes name, email and gender',
        (done) => {
          const newUser = factory.create('newUser');
          const updateUser = factory.create('updateUser');
          factory.signUp(app, request, done, newUser, (token) => {
            request(app)
              .put('/api/v1/users/personal')
              .set('x-user-token', token)
              .send(updateUser)
              .expect(200)
              .end((err, res) => {
                if (err) {
                  done(err);
                } else {
                  res.body.should.have.property('user');
                  res.body.user.should.have.property('name');
                  res.body.user.should.have.property('email');
                  res.body.user.should.have.property('gender');
                  done();
                }
              });
          });
        },
      );
    });

    describe('Update personal details with invalid token', () => {
      it(
        'it should return status code 200 and an object that has attributes name, email and gender',
        (done) => {
          const newUser = factory.create('newUser');
          const updateUser = factory.create('updateUser');
          factory.signUp(app, request, done, newUser, (token) => {
            request(app)
              .put('/api/v1/users/personal')
              .set('x-user-token', null)
              .send(updateUser)
              .expect(401)
              .end((err, res) => {
                if (err) {
                  done(err);
                } else {
                  res.body.should.have.property('error');
                  done();
                }
              });
          });
        },
      );
    });

    describe('Update password', () => {
      it('it should return status code 200', (done) => {
        const newUser = factory.create('newUser');
        const password = factory.create('updatePassword');
        factory.signUp(app, request, done, newUser, (token) => {
          request(app)
            .put('/api/v1/users/password')
            .set('x-user-token', token)
            .send(password)
            .expect(200)
            .end((err) => {
              if (err) return done(err);
              return done();
            });
        });
      });
    });

    describe('Update password without a valid token', () => {
      it('it should return status code 401', (done) => {
        const newUser = factory.create('newUser');
        const password = factory.create('updatePassword');
        factory.signUp(app, request, done, newUser, (token) => {
          request(app)
            .put('/api/v1/users/password')
            .set('x-user-token', null)
            .send(password)
            .expect(401)
            .end((err, res) => {
              if (err) return done(err);
              res.body.should.have.property('error');
              return done();
            });
        });
      });
    });

    describe('Update password with incorrect current password', () => {
      it('it should return status code 200', (done) => {
        const newUser = factory.create('newUser');
        const password = factory.create('updatePassword', { currentPassword: 'fsfjsnjkfs' });
        factory.signUp(app, request, done, newUser, (token) => {
          request(app)
            .put('/api/v1/users/password')
            .set('x-user-token', token)
            .send(password)
            .expect(400)
            .end((err) => {
              if (err) return done(err);
              return done();
            });
        });
      });
    });

    describe('Update password with empty new password', () => {
      it('it should return status code 400', (done) => {
        const newUser = factory.create('newUser');
        const password = factory.create('updatePassword', { newPassword: '' });
        factory.signUp(app, request, done, newUser, (token) => {
          request(app)
            .put('/api/v1/users/password')
            .set('x-user-token', token)
            .send(password)
            .expect(400)
            .end((err) => {
              if (err) return done(err);
              return done();
            });
        });
      });
    });

    describe('Get user favorites', () => {
      it('it should return status code 200', (done) => {
        const newUser = factory.create('newUser');
        factory.signUp(app, request, done, newUser, (token, user) => {
          request(app)
            .get(`/api/v1/users/${user.userId}/favorites`)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
              res.body.should.have.property('recipes');
              res.body.recipes.should.be.a('array');
              return done();
            });
        });
      });
    });

    describe('Get user favorites ids', () => {
      it('it should return status code 200', (done) => {
        const newUser = factory.create('newUser');
        factory.signUp(app, request, done, newUser, (token, user) => {
          request(app)
            .get(`/api/v1/users/${user.userId}/favorites/ids`)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
              res.body.should.have.property('recipeIds');
              res.body.recipeIds.should.be.a('array');
              return done();
            });
        });
      });
    });

    describe('Authenticated user adds recipe as favorite', () => {
      it('it should return status code 200', (done) => {
        const newUser = factory.create('newUser');
        const newRecipe = factory.create('newRecipe');
        factory.signUp(app, request, done, newUser, (token) => {
          models.Recipe.create(newRecipe)
            .then((recipe) => {
              request(app)
                .post('/api/v1/users/favorites')
                .set('x-user-token', token)
                .send({ recipeId: recipe.id })
                .expect(200)
                .end((err) => {
                  if (err) return done(err);
                  return done();
                });
            })
            .catch(() => { done(); });
        });
      });
    });

    describe('Authenticated user removes recipe as favorite', () => {
      it('it should return status code 200', (done) => {
        const newUser = factory.create('newUser');
        const newRecipe = factory.create('newRecipe');
        factory.signUp(app, request, done, newUser, (token) => {
          models.Recipe.create(newRecipe)
            .then((recipe) => {
              factory.favoriteRecipe = (
                app,
                request,
                done,
                token,
                recipe.recipeId,
                () => {
                  request(app)
                    .delete('/api/v1/users/favorites')
                    .set('x-user-token', token)
                    .send({ recipeId: recipe.id })
                    .expect(200)
                    .end((errChild) => {
                      if (errChild) {
                        done(errChild);
                      } else { done(); }
                    });
                });
            })
            .catch(() => { done(); });
        });
      });
    });

    describe('Get user categories', () => {
      it('it should return status code 200', (done) => {
        const newUser = factory.create('newUser');
        factory.signUp(app, request, done, newUser, (token, user) => {
          request(app)
            .get(`/api/v1/users/${user.userId}/categories`)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
              res.body.should.have.property('categories');
              res.body.categories.should.be.a('array');
              return done();
            });
        });
      });
    });
  });

  // Test Ends
});
