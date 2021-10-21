const { Router } = require('express');
const { idValidation, userValidation } = require('../middlewares/validate');

const usersRouter = Router();

const { getCurrentUser, updateUser } = require('../controllers/users');

usersRouter.get('/users/me', idValidation, getCurrentUser);
usersRouter.patch('/users/me', userValidation, updateUser);

module.exports = usersRouter;
