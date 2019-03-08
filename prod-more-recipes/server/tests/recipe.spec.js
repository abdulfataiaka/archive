import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';

import app from '../app';
import models from '../database/models';

import factory from '../factory';

const should = chai.should();
chai.use(chaiHttp);

describe('Testing recipes controllers and middlewares', () => {
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

  describe('Add a new recipe without a recipe image', () => {
    it('it should return status code 400 with an error message', (done) => {
      const newRecipe = factory.create('newRecipe');
      const imageError = 'Image should be of type png, jpg or jpeg and maxsize 500 KB';
      request(app)
        .post('/api/v1/recipes')
        .set('x-user-token', userOneToken)
        .send(newRecipe)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          res.body.should.have.property('error');
          res.body.error.should.be.a('string');
          res.body.error.toLowerCase()
            .should.be.equal(imageError.toLowerCase());
          return done();
        });
    });
  });

  describe('Add a new recipe without a recipe title', () => {
    it('it should return status code 400 with an error message', (done) => {
      const newRecipe = factory.create('newRecipe', { title: '', uploadImage: 1 });
      const titleError = 'The title field is required.';
      request(app)
        .post('/api/v1/recipes')
        .set('x-user-token', userOneToken)
        .send(newRecipe)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          res.body.should.have.property('error');
          res.body.error.should.be.a('string');
          res.body.error.toLowerCase()
            .should.be.equal(titleError.toLowerCase());
          return done();
        });
    });
  });

  describe('Add a new recipe without a recipe procedure', () => {
    it('it should return status code 400 with an error message', (done) => {
      const newRecipe = factory.create('newRecipe', { procedure: '', uploadImage: 1 });
      const procedureError = 'The procedure field is required.';
      request(app)
        .post('/api/v1/recipes')
        .set('x-user-token', userOneToken)
        .send(newRecipe)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          res.body.should.have.property('error');
          res.body.error.should.be.a('string');
          res.body.error.toLowerCase()
            .should.be.equal(procedureError.toLowerCase());
          return done();
        });
    });
  });

  describe('Add a new recipe with good recipe details', () => {
    it('it should return status code 201', (done) => {
      const {
        title,
        ingredients,
        procedure,
      } = factory.create('newRecipe');
      request(app)
        .post('/api/v1/recipes')
        .set('x-user-token', userOneToken)
        .field('title', title)
        .field('ingredients', ingredients)
        .field('procedure', procedure)
        .field('uploadImage', 1)
        .attach('recipeImageFile', 'public/img/test/2.jpg')
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
  });


  describe('Add a new recipe without a recipe ingredients', () => {
    it('it should return status code 400 with an error message', (done) => {
      const newRecipe = factory.create('newRecipe', { ingredients: '', uploadImage: 1 });
      const ingredientsError = 'The ingredients field is required.';
      request(app)
        .post('/api/v1/recipes')
        .set('x-user-token', userOneToken)
        .send(newRecipe)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          res.body.should.have.property('error');
          res.body.error.should.be.a('string');
          res.body.error.toLowerCase()
            .should.be.equal(ingredientsError.toLowerCase());
          return done();
        });
    });
  });

  describe('To get all recipes in catalog', () => {
    it('it should return status code 200 with a list of recipes', (done) => {
      request(app)
        .get('/api/v1/recipes')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          res.body.should.have.property('recipes');
          res.body.recipes.should.be.a('array');
          res.body.recipes.length.should.be.equal(1);
          return done();
        });
    });
  });

  describe('To get popular recipes', () => {
    it('it should return status code 200 with a list of recipes', (done) => {
      request(app)
        .get('/api/v1/recipes?sort=upvotes&order=desc')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          res.body.should.not.have.property('pagination');
          res.body.should.have.property('recipes');
          res.body.recipes.should.be.a('array');
          return done();
        });
    });
  });

  describe('To edit a recipe', () => {
    it('it should return status code 200 and the updated recipe object', (done) => {
      const newTitle = 'Edited title';
      const newRecipe = factory.create('newRecipe', { title: newTitle });
      request(app)
        .put(`/api/v1/recipes/${recipeOneId}`)
        .expect(200)
        .set('x-user-token', userOneToken)
        .send(newRecipe)
        .end((err, res) => {
          if (err) return done(err);
          res.body.should.have.property('recipe');
          res.body.recipe.should.be.a('object');
          res.body.recipe.should.have.property('title');
          res.body.recipe.title.should.be.a('string');
          res.body.recipe.title.toLowerCase()
            .should.equal(newTitle.toLowerCase());
          return done();
        });
    });
  });

  describe('To get a single recipe', () => {
    it('it should return status code 200 with the recipe object', (done) => {
      request(app)
        .get(`/api/v1/recipes/${recipeOneId}`)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          res.body.should.have.property('recipe');
          res.body.recipe.should.be.a('object');
          res.body.recipe.should.have.property('title');
          res.body.recipe.should.have.property('ingredients');
          res.body.recipe.title.should.be.a('string');
          res.body.recipe.ingredients.should.be.a('string');
          res.body.recipe.title.toLowerCase()
            .should.equal(recipeOne.title.toLowerCase());
          res.body.recipe.ingredients.toLowerCase()
            .should.equal(recipeOne.ingredients.toLowerCase());
          return done();
        });
    });
  });

  describe('To post a review for recipe', () => {
    it('it should return status code 201 with an object containing the comment', (done) => {
      const comment = 'This is a test comment for review';
      request(app)
        .post(`/api/v1/recipes/${recipeOneId}/reviews`)
        .set('x-user-token', userOneToken)
        .send({ comment })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          res.body.should.have.property('review');
          res.body.review.should.be.a('object');
          res.body.review.should.have.property('comment');
          res.body.review.comment.toLowerCase()
            .should.equal(comment.toLowerCase());
          return done();
        });
    });
  });

  describe('To post a review for recipe with empty comment', () => {
    it('it should return status code 400', (done) => {
      const comment = '';
      request(app)
        .post(`/api/v1/recipes/${recipeOneId}/reviews`)
        .set('x-user-token', userOneToken)
        .send({ comment })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          res.body.should.have.property('error');
          return done();
        });
    });
  });

  describe('To delete a recipe', () => {
    it('it should return status code 200 with an object containing the comment', (done) => {
      request(app)
        .delete(`/api/v1/recipes/${recipeOneId}`)
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

  describe('To delete a recipe that does not exist', () => {
    it('it should return status code 404', (done) => {
      const newRecipeId = 4355;
      request(app)
        .delete(`/api/v1/recipes/${newRecipeId}`)
        .set('x-user-token', userOneToken)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          res.body.should.have.property('error');
          return done();
        });
    });
  });
});
