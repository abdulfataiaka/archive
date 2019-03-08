import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import app from '../app';
import models from '../database/models';
import factory from '../factory';

const should = chai.should();
chai.use(chaiHttp);

describe('Testing voting controllers and middlewares', () => {
  const recipeOne = factory.create('newRecipe');
  const userOne = factory.create('newUser');
  let userOneToken = null;
  let recipeOneId = null;

  beforeEach((done) => {
    models.User.destroy({
      where: {},
      truncate: true,
      cascade: true,
    }).then(() => {
      models.Recipe.destroy({
        where: {},
        truncate: true,
        cascade: true,
      }).then(() => {
        factory.signUp(app, request, done, userOne, (token, user) => {
          userOneToken = token;
          models.Recipe.create({ ...recipeOne, userId: user.userId })
            .then((recipe) => {
              recipeOneId = recipe.id;
              done();
            })
            .catch((err) => { done(err); });
        });
      }).catch((err) => { done(err); });
    }).catch((err) => { done(err); });
  });

  describe('Recipes voting', () => {
    describe('Upvote a recipe', () => {
      it('it should return status code 200 and the recipe ID', (done) => {
        request(app)
          .put(`/api/v1/recipes/${recipeOneId}/upvote`)
          .expect(200)
          .set('x-user-token', userOneToken)
          .end((err, res) => {
            if (err) return done(err);
            res.body.should.have.property('recipeId');
            const inRecipeId = parseInt(res.body.recipeId, 10);
            inRecipeId.should.equal(recipeOneId);
            return done();
          });
      });
    });

    describe('Downvote a recipe', () => {
      it('it should return status code 200 and the recipe ID', (done) => {
        request(app)
          .put(`/api/v1/recipes/${recipeOneId}/downvote`)
          .expect(200)
          .set('x-user-token', userOneToken)
          .end((err, res) => {
            if (err) return done(err);
            res.body.should.have.property('recipeId');
            const inRecipeId = parseInt(res.body.recipeId, 10);
            inRecipeId.should.equal(recipeOneId);
            return done();
          });
      });
    });

    describe('To get user vote for recipe', () => {
      it('it should return status code 200 with an object containing the vote', (done) => {
        request(app)
          .get(`/api/v1/recipes/${recipeOneId}/vote`)
          .set('x-user-token', userOneToken)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            res.body.should.have.property('vote');
            res.body.vote.should.have.property('userId');
            res.body.vote.should.have.property('recipeId');
            res.body.vote.should.have.property('vote');
            const inRecipeId = parseInt(res.body.vote.recipeId, 10);
            inRecipeId.should.equal(recipeOneId);
            return done();
          });
      });
    });
  });

  // Test Ends
});
