const { response, request } = require('express');

/**
 * @path /api/auth/register
 */
const registerUser = async (req = request, res = response) => {
  return res.status(200).json({ msg: 'Crear usuario.' });
};

module.exports = {
  registerUser,
};
