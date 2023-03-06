const router = require('express').Router();

const {
  updateProfile,
  getCurrentUser,
} = require('../contollers/users');

const { validateUpdateProfile } = require('../middlewares/validator');

router.get('/me', getCurrentUser); // возвращает информацию о пользователе (email и имя)

router.patch('/me', validateUpdateProfile, updateProfile); // обновляет информацию о пользователе (email и имя)

module.exports = router;
