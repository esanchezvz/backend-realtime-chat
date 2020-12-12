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

module.exports = {
  signJwt,
};
