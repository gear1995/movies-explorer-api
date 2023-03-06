const router = require('express').Router();

const {
  getMovies,
  postMovie,
  deleteMovie,
} = require('../contollers/movies');

const { validatePostMovie, validateMovieId } = require('../middlewares/validator');

router.get('/', getMovies); // возвращает все сохранённые текущим  пользователем фильмы

router.post('/', validatePostMovie, postMovie); // создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId

router.delete('/:movieId', validateMovieId, deleteMovie); // удаляет сохранённый фильм по id

module.exports = router;
