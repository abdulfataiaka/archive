import express from 'express';
import recipes from './recipes';
import users from './users';
import categories from './categories';
//  create express router to be used in all route modules
const router = express.Router();

//  call route creator functions
recipes(router);
users(router);
categories(router);

//  export express router instance
export default router;
