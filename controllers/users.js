const { response, request } = require('express');
const { validationResult } = require('express-validator');
const User = require('../models/User');

/**
 * @path /api/users/
 * @method GET
 * @access Private
 */
const getUsers = async (req = request, res = response, next) => {
  try {
    const offset = Number(req.query.offset) || 0;
    const users = await User.find({ _id: { $ne: req.uid } })
      .sort('-online')
      .skip(offset)
      .limit(20);

    return res.status(200).json({
      success: true,
      message: 'Ususarios obtenidos exitosamente.',
      data: { users },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
};
