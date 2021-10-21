const { Router } = require('express');

const moviesRouter = Router();

moviesRouter.get('/movies');
moviesRouter.post('/movies');
moviesRouter.delete('/movies/:id');

module.exports = moviesRouter;
