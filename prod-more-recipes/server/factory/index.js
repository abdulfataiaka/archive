import {
  newUser,
  authUser,
  updateUser,
  updatePassword,
} from './users';

import {
  newRecipe,
} from './recipes';

const create = (type, update) => {
  if (type === 'newUser') return newUser(update);
  if (type === 'authUser') return authUser(update);
  if (type === 'updateUser') return updateUser(update);
  if (type === 'updatePassword') return updatePassword(update);
  if (type === 'newRecipe') return newRecipe(update);
  return null;
};

const signUp = (app, request, done, user, callback) => {
  request(app)
    .post('/api/v1/users/signup')
    .send(user)
    .expect(201)
    .end((err, res) => {
      if (err) {
        done(err);
      } else {
        res.body.should.have.property('token');
        if (typeof callback === 'function') {
          const { token, user: signedUpUser } = res.body;
          callback(token, signedUpUser);
        } else {
          done();
        }
      }
    });
};

const signIn = (app, request, done, user, callback) => {
  request(app)
    .post('/api/v1/users/signin')
    .send(user)
    .expect(200)
    .end((err, res) => {
      if (err) done(err);
      else {
        res.body.should.have.property('token');
        if (typeof callback === 'function') {
          callback(res.body.token);
        } else {
          done();
        }
      }
    });
  done();
};

const favoriteRecipe = (app, request, done, token, recipeId, callback) => {
  request(app)
    .post('/api/v1/users/favorites')
    .set('x-user-token', token)
    .send({ recipeId })
    .expect(200)
    .end((err, res) => {
      res.body.should.have.property('id');
      if (err) {
        done(err);
      } else if (typeof callback === 'function') {
        callback(res.body.id);
      } else {
        done();
      }
    });
};

const addFavoriteToCategory = (app, request, done, token, categoryId, favoriteId, callback) => {
  request(app)
    .put('/api/v1/categories/add')
    .send({ favoriteId, categoryId })
    .set('x-user-token', token)
    .expect(200)
    .end((err) => {
      if (err) {
        done(err);
      } else if (typeof callback === 'function') {
        callback();
      } else {
        done();
      }
    });
};

const addCategory = (app, request, done, token, name, callback) => {
  request(app)
    .post('/api/v1/categories')
    .send({ name })
    .set('x-user-token', token)
    .expect(201)
    .end((err, res) => {
      if (err) {
        done(err);
      } else {
        res.body.should.have.property('category');
        res.body.category.should.be.a('object');
        res.body.category.should.have.property('name');
        res.body.category.name.should.equal(name);
        if (typeof callback === 'function') {
          callback(res.body.category.id);
        } else {
          done();
        }
      }
    });
};

export default {
  create,
  signUp,
  favoriteRecipe,
  addCategory,
  signIn,
  addFavoriteToCategory,
};
