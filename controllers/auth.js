const { response, request } = require('express');
const { validationResult } = require('express-validator');
const User = require('../models/User');

/**
 * @path /api/auth/register
 */
const registerUser = async (req = request, res = response, next) => {
  try {
    const { email, password, name } = req.body;

    const user = await User.create({ email, password, name });

    return res.status(200).json({
      success: true,
      message: 'Usuario creado exitosamente.',
      data: user,
    });
  } catch (error) {
    if (error.code === 11000) {
      error.message = 'Ya existe una cuenta con ese correo.';
      error.status = 400;
    }

    next(error);
  }
};

module.exports = {
  registerUser,
};
