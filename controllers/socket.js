const Message = require('../models/Message');
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

const saveMessage = async (payload) => {
  const { to, from, message } = payload;
  try {
    const msg = await Message.create({ to, from, message });
    return msg;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  connectUser,
  disconnectUser,
  saveMessage,
};
