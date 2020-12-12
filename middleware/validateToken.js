const jwt = require('jsonwebtoken');

const validateJwt = async (req, _res, next) => {
  try {
    let token = '';
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) throw new Error('auth/unauthorized-access');

    const { uid } = jwt.verify(token, process.env.TOKEN_SECRET);
    req.uid = uid;

    next();
  } catch (error) {
    if (error.message === 'auth/wrong-credentials') {
      error.message = 'Acceso no autorizado.';
      error.status = 401;
    }

    next(error);
  }
};

module.exports = {
  validateJwt,
};
