const { response, request } = require('express');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const { signJwt } = require('../utils/jwt');

/**
 * @path /api/auth/register
 * @method POST
 */
const registerUser = async (req = request, res = response, next) => {
  try {
    const { email, password, name } = req.body;

    const user = await User.create({ email, password, name });

    const token = await signJwt({ uid: user.uid });

    return res.status(200).json({
      success: true,
      message: 'Usuario creado exitosamente.',
      data: { user, token },
    });
  } catch (error) {
    if (error.code === 11000) {
      error.message = 'Ya existe una cuenta con ese correo.';
      error.status = 400;
    }

    next(error);
  }
};

/**
 * @path /api/auth/login
 * @method POST
 */
const login = async (req = request, res = response, next) => {
  try {
    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) throw new Error('auth/wrong-credentials');

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) throw new Error('auth/wrong-credentials');

    const token = await signJwt({ uid: user.uid });

    return res.status(200).json({
      success: true,
      message: 'Inicio de sesión exitoso.',
      data: { user, token },
    });
  } catch (error) {
    if (error.message === 'auth/wrong-credentials') {
      error.message = 'El correo y/o la contraseña no son válidos.';
      error.status = 401;
    }

    next(error);
  }
};

/**
 * @path /api/auth/token
 * @method GET
 */
const updateToken = async (req = request, res = response, next) => {
  try {
    const token = await signJwt({ uid: req.uid });

    const user = await User.findById(req.uid);

    return res.status(200).json({
      success: true,
      message: 'Token actualizado correctamente.',
      data: { user, token },
    });
  } catch (error) {
    if (error.message === 'auth/wrong-credentials') {
      error.message = 'El correo y/o la contraseña no son válidos.';
      error.status = 401;
    }

    next(error);
  }
};

module.exports = {
  registerUser,
  login,
  updateToken,
};
