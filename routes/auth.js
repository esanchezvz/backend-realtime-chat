const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middleware/fieldValidation');
const { registerUser, login, updateToken } = require('../controllers/auth');
const { validateJwt } = require('../middleware/validateToken');

/**
 * @path /api/auth
 */
const router = Router();

router.post(
  '/register',
  [
    check('name', 'El nombre es requerido.').not().isEmpty(),
    check('email', 'El email es requerido.').not().isEmpty(),
    check('email', 'Debe ser un correo válido.').isEmail(),
    check('password', 'La contraseña es requerida.').not().isEmpty(),
    check(
      'password',
      'La contraseña debe contener al menos 6 caracteres.'
    ).isLength({ min: 6 }),
    validateFields,
  ],
  registerUser
);

router.post(
  '/login',
  [
    check('email', 'El email es requerido.').not().isEmpty(),
    check('password', 'La contraseña es requerida.').not().isEmpty(),
    validateFields,
  ],
  login
);

router.get('/token', validateJwt, updateToken);

module.exports = router;
