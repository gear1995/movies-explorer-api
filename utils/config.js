require('dotenv').config();

function validateUrl(url) {
  const regEx = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*/gm;

  if (regEx.test(url)) {
    return url;
  }
  throw new Error('Некорректый формат ссылки');
}

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const ALLOWED_CORS = [
  'https://gear1995movies.nomoredomains.work',
  'http://gear1995movies.nomoredomains.work',
  'https://api.gear1995movies.nomoredomains.work',
  'http://api.gear1995movies.nomoredomains.work',
  'http://localhost:3000',
  'localhost:3000',
];

const {
  PORT = 3000,
  JWT_SECRET_DEV = 'secretkey',
  DATABASE_URL = 'mongodb://localhost:27017/bitfilmsdb',
} = process.env;

const JWT_STORAGE_TIME = '7d';
const SALT_LENGTH = 10;

module.exports = {
  validateUrl,
  PORT,
  DATABASE_URL,
  DEFAULT_ALLOWED_METHODS,
  ALLOWED_CORS,
  JWT_SECRET_DEV,
  JWT_STORAGE_TIME,
  SALT_LENGTH,
};
