const { Router } = require('express');

const usersRouter = Router();

usersRouter.get('/users/me');
usersRouter.patch('/users/me');

module.exports = usersRouter;
