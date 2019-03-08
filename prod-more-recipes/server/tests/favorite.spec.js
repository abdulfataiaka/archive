import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';

import app from '../app';
import models from '../database/models';

import factory from '../factory';

const should = chai.should();
chai.use(chaiHttp);

describe('Testing favorite controllers and middlewares', () => {
  const recipeOne = factory.create('newRecipe');
  const userOne = factory.create('newUser');
  let userOneToken = null;
  let recipeOneId = null;

  beforeEach((done) => {
    models.User.destroy({
      where: {},
      truncate: true,
      cascade: true,
    });
    models.Recipe.destroy({
      where: {},
      truncate: true,
      cascade: true,
    });
    models.Category.destroy({
      where: {},
      truncate: true,
      cascade: true,
    });
    factory.signUp(app, request, done, userOne, (token, user) => {
      userOneToken = token;
      models.Recipe.create({ ...recipeOne, userId: user.userId })
        .then((recipe) => {
          recipeOneId = recipe.id;
          done();
        })
        .catch((err) => { done(err); });
    });
  });

  describe('To add recipe as favorite', () => {
    it('it should return status code 200 with an object containing the recipeId', (done) => {
      request(app)
        .post('/api/v1/users/favorites')
        .send({ recipeId: recipeOneId })
        .set('x-user-token', userOneToken)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          res.body.should.have.property('recipeId');
          const inRecipeId = parseInt(res.body.recipeId, 10);
          inRecipeId.should.equal(recipeOneId);
          return done();
        });
    });
  });

  describe('To add recipe that does not exist as favorite', () => {
    it('it should return status code 404', (done) => {
      const newRecipeId = 5634;
      newRecipeId.should.not.equal(recipeOneId);
      request(app)
        .post('/api/v1/users/favorites')
        .send({ recipeId: newRecipeId })
        .set('x-user-token', userOneToken)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          res.body.should.have.property('error');
          return done();
        });
    });
  });

  describe('To add recipe as favorite with an invalid token', () => {
    it('it should return status code 401', (done) => {
      request(app)
        .post('/api/v1/users/favorites')
        .send({ recipeId: recipeOneId })
        .set('x-user-token', null)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          res.body.should.have.property('error');
          return done();
        });
    });
  });


  describe('To delete a favorite recipe', () => {
    it('it should return status code 200 with an object containing the recipeId', (done) => {
      request(app)
        .post('/api/v1/users/favorites')
        .send({ recipeId: recipeOneId })
        .set('x-user-token', userOneToken)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            res.body.should.have.property('recipeId');
            const inRecipeId = parseInt(res.body.recipeId, 10);
            inRecipeId.should.equal(recipeOneId);
            request(app)
              .delete('/api/v1/users/favorites')
              .send({ recipeId: recipeOneId })
              .set('x-user-token', userOneToken)
              .expect(200)
              .end((error, response) => {
                if (error) return done(error);
                res.body.should.have.property('recipeId');
                const secondRecipeId = parseInt(response.body.recipeId, 10);
                secondRecipeId.should.equal(recipeOneId);
                return done();
              });
          }
        });
    });
  });

  describe('Add favorite recipe to category', () => {
    it('it should return status code 200 with an object containing the recipeId', (done) => {
      factory.favoriteRecipe(app, request, done, userOneToken, recipeOneId, (favoriteId) => {
        factory.addCategory(app, request, done, userOneToken, 'New category', (categoryId) => {
          request(app)
            .put('/api/v1/categories/add')
            .send({ favoriteId, categoryId })
            .set('x-user-token', userOneToken)
            .expect(200)
            .end((errorNew) => {
              if (errorNew) return done(errorNew);
              return done();
            });
        });
      });
    });
  });

  describe('Add a non existing favorite recipe to category', () => {
    it('it should return status code 404', (done) => {
      const fakeFavoriteId = 426742;
      factory.addCategory(app, request, done, userOneToken, 'New category', (categoryId) => {
        request(app)
          .put('/api/v1/categories/add')
          .send({ fakeFavoriteId, categoryId })
          .set('x-user-token', userOneToken)
          .expect(404)
          .end((errorNew) => {
            if (errorNew) return done(errorNew);
            return done();
          });
      });
    });
  });

  describe('Remove a non existing favorite recipe from category', () => {
    it('it should return status code 404', (done) => {
      const fakeFavoriteId = 34424;
      request(app)
        .put('/api/v1/categories/remove')
        .send({ fakeFavoriteId })
        .set('x-user-token', userOneToken)
        .expect(404)
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });

  describe('Remove favorite recipe from category', () => {
    it('it should return status code 200', (done) => {
      const newCategory = { name: 'New category' };
      factory.favoriteRecipe(app, request, done, userOneToken, recipeOneId, (favoriteId) => {
        factory.addCategory(app, request, done, userOneToken, 'New category', (categoryId) => {
          factory.addFavoriteToCategory(
            app, request, done,
            userOneToken, categoryId, favoriteId, () => {
              request(app)
                .put('/api/v1/categories/remove')
                .send({ favoriteId })
                .set('x-user-token', userOneToken)
                .expect(200)
                .end((errorNewest) => {
                  if (errorNewest) return done(errorNewest);
                  return done();
                });
            },
          );
        });
      });
    });
  });
  // Test Ends
});
