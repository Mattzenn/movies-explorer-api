const User = require('../models/user');

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .catch(() => {
      // throw new NotFound('Пользователь с таким id не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      // throw new NotFound('Пользователь с таким id не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      // if (err.name === 'ValidationError') {
      //   throw new BadRequest('Переданы некорректные данные при обновлении профиля');
      // }
    })
    .catch(next);
};

module.exports = {
  updateUser,
  getCurrentUser,
};
