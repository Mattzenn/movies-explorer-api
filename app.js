require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const { login, createUser } = require('./controllers/users');
const { loginValidation, userValidation } = require('./middlewares/validate');
const auth = require('./middlewares/auth');
const NotFound = require('./errors/NotFound');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(helmet());

app.post('/signup', userValidation, createUser);
app.post('/signin', loginValidation, login);
app.use('/movies', auth, moviesRouter);
app.use('/users', auth, usersRouter);

app.use('*', () => {
  throw new NotFound('Запрашиваемый ресурс не найден');
});

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listeningnpm run dev  on port ${PORT}`);
});
