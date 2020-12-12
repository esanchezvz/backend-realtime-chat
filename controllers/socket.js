const User = require('../models/User');

const connectUser = async (uid = '') => {
  try {
    const user = await User.findByIdAndUpdate(uid, { online: true });
    return user;
  } catch (error) {
    console.log(error);
  }
};

const disconnectUser = async (uid = '') => {
  try {
    const user = await User.findByIdAndUpdate(uid, { online: false });
    return user;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  connectUser,
  disconnectUser,
};
