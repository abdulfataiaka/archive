import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';

import app from '../app';
import models from '../database/models';

import factory from '../factory';

const should = chai.should();
chai.use(chaiHttp);

describe('Categories controllers and middlewares', () => {
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

  describe('To add a category', () => {
    it('it should return status code 200 with an object containing the new category', (done) => {
      const newCategory = { name: 'New category' };
      request(app)
        .post('/api/v1/categories')
        .send(newCategory)
        .set('x-user-token', userOneToken)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          res.body.should.have.property('category');
          res.body.category.should.be.a('object');
          res.body.category.should.have.property('name');
          res.body.category.name.should.equal(newCategory.name);
          return done();
        });
    });
  });

  describe('To add a category without providing a name', () => {
    it('it should return status code 400', (done) => {
      const newCategory = { name: '' };
      request(app)
        .post('/api/v1/categories')
        .send(newCategory)
        .set('x-user-token', userOneToken)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          res.body.should.have.property('error');
          return done();
        });
    });
  });


  describe('To delete a non existing category', () => {
    it('it should return status code 404', (done) => {
      request(app)
        .delete(`/api/v1/categories/${34242}`)
        .set('x-user-token', userOneToken)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          res.body.should.have.property('error');
          return done();
        });
    });
  });

  describe('Deleting a category', () => {
    it('it should return status code 200', (done) => {
      const newCategory = { name: 'New category' };
      request(app)
        .post('/api/v1/categories')
        .send(newCategory)
        .set('x-user-token', userOneToken)
        .expect(201)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            res.body.should.have.property('category');
            res.body.category.should.have.property('id');
            const categoryId = res.body.category.id;
            request(app)
              .delete(`/api/v1/categories/${categoryId}`)
              .set('x-user-token', userOneToken)
              .expect(200)
              .end((error, response) => {
                if (error) return done(error);
                return done();
              });
          }
        });
    });
  });

  // Test Ends
});
