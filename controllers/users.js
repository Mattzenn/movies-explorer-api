const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');

const { NODE_ENV, JWT_SECRET } = process.env;

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .catch(() => {
      throw new NotFound('Пользователь с таким id не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFound('Пользователь с таким id не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest('Переданы некорректные данные при обновлении профиля');
      }
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  return User.findOne({ email })
    .then((admin) => {
      if (admin) {
        next(new Conflict('Пользователь с таким email уже существует'));
      }
      bcrypt.hash(password, 10)
        // eslint-disable-next-line object-curly-newline
        .then((hash) => User.create({ name, email, password: hash }))
        .then((user) => res.send({
          data: {
            name: user.name,
            email: user.email,
          },
        }));
    })
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new Conflict('Пользователь с таким email уже существует');
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  updateUser,
  getCurrentUser,
  createUser,
  login,
};
