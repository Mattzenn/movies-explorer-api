const { Router } = require('express');
const { idValidation, userUpdateValidation } = require('../middlewares/validate');

const usersRouter = Router();

const { getCurrentUser, updateUser } = require('../controllers/users');

usersRouter.get('/users/me', idValidation, getCurrentUser);
usersRouter.patch('/users/me', userUpdateValidation, updateUser);

module.exports = usersRouter;
