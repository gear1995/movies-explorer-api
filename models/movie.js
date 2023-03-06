const mongoose = require('mongoose');

const regEx = /https?:\/\/(www)?[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+#?$/i;

const movieSchema = new mongoose.Schema({
  country: { // страна создания фильма
    type: String,
    required: true,
  },
  director: { // режиссёр фильма
    type: String,
    required: true,
  },
  duration: { // длительность фильма
    type: Number,
    required: true,
  },
  year: { // год выпуска фильма
    type: String,
    required: true,
  },
  description: { //  описание фильма
    type: String,
    required: true,
  },
  image: { //  ссылка на постер к фильму
    type: String,
    required: true,
    validate: {
      validator(posterLink) {
        return regEx.test(posterLink);
      },
      message: 'Неправильный формат ссылки',
    },
  },
  trailerLink: { //  ссылка на трейлер фильма
    type: String,
    required: true,
    validate: {
      validator(trailerLinkValidation) {
        return regEx.test(trailerLinkValidation);
      },
      message: 'Неправильный формат ссылки',
    },
  },
  thumbnail: { //  ссылка на миниатюрное изображение постера к фильму.
    type: String,
    required: true,
    validate: {
      validator(thumbnailLinkValidation) {
        return regEx.test(thumbnailLinkValidation);
      },
      message: 'Неправильный формат ссылки',
    },
  },
  owner: { // _id пользователя, который сохранил фильм.
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: { // id фильма, который содержится в ответе сервиса MoviesExplorer.
    type: Number,
    required: true,
  },
  nameRU: { //  название фильма на русском языке.
    type: String,
    required: true,
  },
  nameEN: { // название фильма на английском языке
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
