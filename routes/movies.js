const { Router } = require('express');

const moviesRouter = Router();

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { movieValidation, idValidation } = require('../middlewares/validate');

moviesRouter.get('/movies', getMovies);
moviesRouter.post('/movies', movieValidation, createMovie);
moviesRouter.delete('/movies/:id', idValidation, deleteMovie);

module.exports = moviesRouter;
