const { Schema, model } = require('mongoose');

const MessageSchema = Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    to: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    message: {
      type: String,
      required: [true, 'El campo de mensaje es requerido.'],
    },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      getters: true,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    toObject: {
      virtuals: true,
      getters: true,
    },
    id: false,
    timestamps: true,
  }
);

MessageSchema.virtual('uid').get(function () {
  return this._id.toHexString();
});

module.exports = model('Message', MessageSchema);
