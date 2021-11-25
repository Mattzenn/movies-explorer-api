const Movie = require('../models/movie');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');
const BadRequest = require('../errors/BadRequest');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest(err.message);
      }
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const ownerId = req.user._id;
  const { _id } = req.params;

  Movie.findOne({ movieId: _id })
    .orFail()
    .catch(() => {
      throw new NotFound('Карточка с таким id не найдена');
    })
    .then((movie) => {
      if (movie.owner.toString() === ownerId) {
        Movie.findOneAndDelete({ movieId: _id })
          .then((datamovie) => res.send(datamovie));
      } else {
        throw new Forbidden('Недостаточно прав!');
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
