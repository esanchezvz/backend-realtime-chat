const { response, request } = require('express');
const { validationResult } = require('express-validator');
const Message = require('../models/Message');

/**
 * @path /api/messages/
 * @method GET
 * @access Private
 */
const getMessages = async (req = request, res = response, next) => {
  try {
    const offset = Number(req.query.offset) || 0;
    const messages = await Message.find({
      $or: [
        { from: req.uid, to: req.params.from },
        { from: req.params.from, to: req.uid },
      ],
    })
      .sort({ createdAt: 'desc' })
      .skip(offset)
      .limit(30);

    return res.status(200).json({
      success: true,
      message: 'Mesajes obtenidos exitosamente.',
      data: { messages },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMessages,
};
