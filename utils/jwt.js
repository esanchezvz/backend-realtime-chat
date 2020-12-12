const jwt = require('jsonwebtoken');

const signJwt = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      {
        expiresIn: '24h',
      },
      (err, token) => {
        if (err) reject(err);

        resolve(token);
      }
    );
  });
};

const verifyJwt = (token = '') => {
  try {
    const { uid } = jwt.verify(token, process.env.TOKEN_SECRET);
    return [true, uid];
  } catch (error) {
    return [false, null];
  }
};

module.exports = {
  signJwt,
  verifyJwt,
};
