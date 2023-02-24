require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const NotFoundError = require('./errors/not-found-error');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login, signout } = require('./contollers/users');
const { validateLogin, validateCreateUser } = require('./middlewares/validator');
const cors = require('./middlewares/cors');

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());
app.use(cors);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

/* app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
}); */

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);
app.post('/signout', signout);

app.use(auth);
app.use('/users', userRouter);
app.use('/movies', movieRouter);

app.use(errorLogger);

app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
